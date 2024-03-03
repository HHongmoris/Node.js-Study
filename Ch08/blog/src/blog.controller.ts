/* eslint-disable prettier/prettier */
import {
  Controller,
  Param,
  Body,
  Delete,
  Get,
  Post,
  Put,
} from "@nestjs/common";

@Controller("blog")
export class BlogController {
  @Get()
  getAllPost() {
    console.log("모든 게시글 조회");
  }

  @Post()
  createPost(@Body() post: any) {
    console.log("게시글 작성");
    console.log(post);
  }

  @Get("/:id")
  getPost(@Param("id") id: string) {
    console.log(`[id: ${id}]게시글 하나 가져오기`);
  }

  @Delete("/:id")
  deletePost() {
    console.log("게시글 삭제");
  }

  @Put("/:id")
  updatePost(@Param(`id`) identity, @Body() post: any) {
    console.log(`[${id}] 게시글 업데이트`);
    console.log(post);
  }
}
