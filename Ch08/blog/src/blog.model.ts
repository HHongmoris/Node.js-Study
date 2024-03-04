/* eslint-disable prettier/prettier */
export interface PostDto {
  id: string;
  title: string;
  content: string;
  name: string;
  createdDt: Date;
  updatedDt?: Date; // null이 가능하면 ? 붙이기
}
