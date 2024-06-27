export interface BoardType {
    boardId: string
    content: string
    writerUuid: string
    writerName: string
    writerProfileImageUrl: string
    pinned: boolean
    createdAt: string
    updatedAt: boolean
    imageUrls: string[]
    likeCount: number
    commentCount: number
}
