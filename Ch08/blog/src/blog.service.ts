/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PostDto } from "./blog.model";
// import { BlogFileRepository, BlogRepository } from "./blog.repository";
import { BlogMongoRepository } from "./blog.repository";

@Injectable()
export class BlogService {
  // posts = [];

  // @Injectable() 데코레이터가 알아서 필요한 객체 주입
  // blogRepository: BlogRepository;
  // constructor() {
  //   this.blogRepository = new BlogFileRepository();
  // }

  // constructor(private blogRepository: BlogFileRepository) {}
  constructor(private blogRepository: BlogMongoRepository) {}

  async getAllPosts() {
    return await this.blogRepository.getAllPost();
  }

  createPost(postDto: PostDto) {
    // const id = this.posts.length + 1;
    // this.posts.push({ id: id.toString(), ...postDto, createdDt: new Date() });
    this.blogRepository.createPost(postDto);
  }

  async getPost(id): Promise<PostDto> {
    // const post = this.posts.find((post) => {
    //   return post.id === id;
    // });
    // console.log(post);
    // return post;
    return await this.blogRepository.getPost(id);
  }

  delete(id) {
    // const filteredPosts = this.posts.filter((post) => post.id !== id);
    // this.posts = [...filteredPosts];
    this.blogRepository.deletePost(id);
  }

  updatePost(id, postDto: PostDto) {
    // const updateIndex = this.posts.findIndex((post) => post.id === id);
    // const updatePost = { id, ...postDto, updatedDt: new Date() };
    // this.posts[updateIndex] = updatePost;
    // return updatePost;
    this.blogRepository.updatePost(id, postDto);
  }
}
