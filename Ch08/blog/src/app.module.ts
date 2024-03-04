/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service";
import { BlogFileRepository, BlogMongoRepository } from "./blog.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Blog, BlogSchema } from "./blog.schema";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://<아이디>:<패스워드>@<클러스터정보>/blog",
    ),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export class AppModule {}
