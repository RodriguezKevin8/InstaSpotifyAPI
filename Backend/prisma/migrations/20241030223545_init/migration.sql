-- CreateTable
CREATE TABLE "album" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "portada_url" VARCHAR(255),
    "release_date" DATE,
    "artist_id" INTEGER,

    CONSTRAINT "album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anuncio" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT,
    "monto_ganado" DECIMAL(10,2) DEFAULT 0.0,
    "activo" BOOLEAN DEFAULT true,
    "usuario_id" INTEGER,

    CONSTRAINT "anuncio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cancion" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "genre_id" INTEGER,
    "album_id" INTEGER,
    "artist_id" INTEGER,
    "file_url" VARCHAR(255) NOT NULL,
    "portada_url" VARCHAR(255),
    "release_date" DATE,
    "reproducciones" INTEGER DEFAULT 0,

    CONSTRAINT "cancion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comentario" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "usuario_id" INTEGER,
    "publicacion_id" INTEGER,

    CONSTRAINT "comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ganancias" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER,
    "total_ganancias" DECIMAL(10,2) DEFAULT 0.0,
    "monto_por_reproduccion" DECIMAL(5,2) DEFAULT 0.0,
    "total_reproducciones" INTEGER DEFAULT 0,
    "ganancias_por_cancion" DECIMAL(10,2) DEFAULT 0.0,
    "ganancias_por_anuncio" DECIMAL(10,2) DEFAULT 0.0,
    "cancion_id" INTEGER,
    "anuncio_id" INTEGER,
    "fecha_actualizacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ganancias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genero" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "portada_url" VARCHAR(255),

    CONSTRAINT "genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historia" (
    "id" SERIAL NOT NULL,
    "content_url" VARCHAR(255),
    "descripcion" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "cancion_id" INTEGER,

    CONSTRAINT "historia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "megusta" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "cancion_id" INTEGER,
    "publicacion_id" INTEGER,

    CONSTRAINT "megusta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfil" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "avatar_url" VARCHAR(255),
    "birth_date" DATE,

    CONSTRAINT "perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playlist" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "portada_url" VARCHAR(255),
    "user_id" INTEGER,

    CONSTRAINT "playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playlistcancion" (
    "playlist_id" INTEGER NOT NULL,
    "cancion_id" INTEGER NOT NULL,

    CONSTRAINT "playlistcancion_pkey" PRIMARY KEY ("playlist_id","cancion_id")
);

-- CreateTable
CREATE TABLE "publicacion" (
    "id" SERIAL NOT NULL,
    "content_url" VARCHAR(255),
    "descripcion" TEXT,
    "user_id" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "publicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seguimiento" (
    "id" SERIAL NOT NULL,
    "follower_id" INTEGER,
    "followed_id" INTEGER,

    CONSTRAINT "seguimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "role" VARCHAR(20) NOT NULL,
    "nombre" VARCHAR(100),
    "profile_id" INTEGER,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_anuncio_usuario" ON "anuncio"("usuario_id");

-- CreateIndex
CREATE INDEX "idx_cancion_album" ON "cancion"("album_id");

-- CreateIndex
CREATE INDEX "idx_cancion_artist" ON "cancion"("artist_id");

-- CreateIndex
CREATE INDEX "idx_cancion_genero" ON "cancion"("genre_id");

-- CreateIndex
CREATE INDEX "idx_ganancias_usuario" ON "ganancias"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_username_key" ON "usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "album" ADD CONSTRAINT "album_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "anuncio" ADD CONSTRAINT "anuncio_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cancion" ADD CONSTRAINT "cancion_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cancion" ADD CONSTRAINT "cancion_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cancion" ADD CONSTRAINT "cancion_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genero"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_publicacion_id_fkey" FOREIGN KEY ("publicacion_id") REFERENCES "publicacion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ganancias" ADD CONSTRAINT "ganancias_anuncio_id_fkey" FOREIGN KEY ("anuncio_id") REFERENCES "anuncio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ganancias" ADD CONSTRAINT "ganancias_cancion_id_fkey" FOREIGN KEY ("cancion_id") REFERENCES "cancion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ganancias" ADD CONSTRAINT "ganancias_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historia" ADD CONSTRAINT "historia_cancion_id_fkey" FOREIGN KEY ("cancion_id") REFERENCES "cancion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historia" ADD CONSTRAINT "historia_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "megusta" ADD CONSTRAINT "megusta_cancion_id_fkey" FOREIGN KEY ("cancion_id") REFERENCES "cancion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "megusta" ADD CONSTRAINT "megusta_publicacion_id_fkey" FOREIGN KEY ("publicacion_id") REFERENCES "publicacion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "megusta" ADD CONSTRAINT "megusta_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "playlist" ADD CONSTRAINT "playlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "playlistcancion" ADD CONSTRAINT "playlistcancion_cancion_id_fkey" FOREIGN KEY ("cancion_id") REFERENCES "cancion"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "playlistcancion" ADD CONSTRAINT "playlistcancion_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "playlist"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "publicacion" ADD CONSTRAINT "publicacion_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seguimiento" ADD CONSTRAINT "seguimiento_followed_id_fkey" FOREIGN KEY ("followed_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seguimiento" ADD CONSTRAINT "seguimiento_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "fk_usuario_profile" FOREIGN KEY ("profile_id") REFERENCES "perfil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
