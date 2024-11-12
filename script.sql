
CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL,
    nombre VARCHAR(100),
    profile_id INT
);

CREATE TABLE Perfil (
    id SERIAL PRIMARY KEY,
    bio TEXT,
    avatar_url VARCHAR(255),
    birth_date DATE
);

CREATE TABLE Genero (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    portada_url VARCHAR(255)
);

CREATE TABLE Album (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    portada_url VARCHAR(255),
    release_date DATE,
    artist_id INT REFERENCES Usuario(id)
);

CREATE TABLE Cancion (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    genre_id INT REFERENCES Genero(id),
    album_id INT REFERENCES Album(id),
    artist_id INT REFERENCES Usuario(id),
    file_url VARCHAR(255) NOT NULL,
    portada_url VARCHAR(255),
    release_date DATE,
    reproducciones INT DEFAULT 0
);

CREATE TABLE Historia (
    id SERIAL PRIMARY KEY,
    content_url VARCHAR(255),
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES Usuario(id),
    cancion_id INT REFERENCES Cancion(id)
);

CREATE TABLE Publicacion (
    id SERIAL PRIMARY KEY,
    content_url VARCHAR(255),
    descripcion TEXT,
    user_id INT REFERENCES Usuario(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Comentario (
    id SERIAL PRIMARY KEY,
    texto TEXT NOT NULL,
    usuario_id INT REFERENCES Usuario(id),
    publicacion_id INT REFERENCES Publicacion(id)
);

CREATE TABLE Anuncio (
    id SERIAL PRIMARY KEY,
    descripcion TEXT,
    monto_ganado DECIMAL(10, 2) DEFAULT 0.0,
    activo BOOLEAN DEFAULT TRUE,
    usuario_id INT REFERENCES Usuario(id)
);

CREATE TABLE Playlist (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    portada_url VARCHAR(255),
    user_id INT REFERENCES Usuario(id)
);

CREATE TABLE PlaylistCancion (
    playlist_id INT REFERENCES Playlist(id) ON DELETE CASCADE,
    cancion_id INT REFERENCES Cancion(id) ON DELETE CASCADE,
    PRIMARY KEY (playlist_id, cancion_id)
);

CREATE TABLE MeGusta (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Usuario(id),
    cancion_id INT REFERENCES Cancion(id),
    publicacion_id INT REFERENCES Publicacion(id)
);

CREATE TABLE Seguimiento (
    id SERIAL PRIMARY KEY,
    follower_id INT REFERENCES Usuario(id),
    followed_id INT REFERENCES Usuario(id)
);

CREATE TABLE Ganancias (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES Usuario(id),
    total_ganancias DECIMAL(10, 2) DEFAULT 0.0,
    monto_por_reproduccion DECIMAL(5, 2) DEFAULT 0.0,
    total_reproducciones INT DEFAULT 0,
    ganancias_por_cancion DECIMAL(10, 2) DEFAULT 0.0,
    ganancias_por_anuncio DECIMAL(10, 2) DEFAULT 0.0,
    cancion_id INT REFERENCES Cancion(id),
    anuncio_id INT REFERENCES Anuncio(id),
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE Usuario
ADD CONSTRAINT fk_usuario_profile
FOREIGN KEY (profile_id) REFERENCES Perfil(id);

CREATE INDEX idx_cancion_genero ON Cancion(genre_id);
CREATE INDEX idx_cancion_album ON Cancion(album_id);
CREATE INDEX idx_cancion_artist ON Cancion(artist_id);
CREATE INDEX idx_anuncio_usuario ON Anuncio(usuario_id);
CREATE INDEX idx_ganancias_usuario ON Ganancias(usuario_id);


--TRIGGERS
CREATE OR REPLACE FUNCTION incrementar_ganancias_por_reproduccion()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE Ganancias
    SET total_ganancias = total_ganancias + ((NEW.reproducciones - OLD.reproducciones) * 0.01),
        total_reproducciones = total_reproducciones + (NEW.reproducciones - OLD.reproducciones),
        fecha_actualizacion = CURRENT_TIMESTAMP
    WHERE usuario_id = NEW.artist_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_incrementar_ganancias
AFTER UPDATE OF reproducciones ON Cancion
FOR EACH ROW
WHEN (NEW.reproducciones > OLD.reproducciones)
EXECUTE FUNCTION incrementar_ganancias_por_reproduccion();

CREATE OR REPLACE FUNCTION registrar_click_anuncio(anuncio_id INT)
RETURNS VOID AS $$
DECLARE
    v_usuario_id INT;
    v_monto_ganado DECIMAL(10, 2);
BEGIN
    
    SELECT usuario_id, monto_ganado
    INTO v_usuario_id, v_monto_ganado
    FROM Anuncio
    WHERE id = anuncio_id;

    UPDATE Ganancias
    SET total_ganancias = total_ganancias + v_monto_ganado,
        ganancias_por_anuncio = ganancias_por_anuncio + v_monto_ganado,
        fecha_actualizacion = CURRENT_TIMESTAMP
    WHERE usuario_id = v_usuario_id;

END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION inicializar_ganancias_usuario()
RETURNS TRIGGER AS $$
BEGIN
    -- Solo insertar en Ganancias si el rol del usuario es 'Artista'
    IF NEW.role = 'Artista' THEN
        INSERT INTO Ganancias (usuario_id, total_ganancias, monto_por_reproduccion, total_reproducciones, ganancias_por_cancion, ganancias_por_anuncio)
        VALUES (NEW.id, 0.0, 0.01, 0, 0.0, 0.0);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_inicializar_ganancias
AFTER INSERT ON Usuario
FOR EACH ROW
EXECUTE FUNCTION inicializar_ganancias_usuario();

