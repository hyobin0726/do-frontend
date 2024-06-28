export interface BoardType {
    boardId: string
    crewId: string
    content: string
    writerUuid: string
    writerName: string
    writerProfileImageUrl: string
    pinned: boolean
    createdAt: string
    updated: boolean
    imageUrls: string[]
    likeCount: number
    commentCount: number
    hostStatus: boolean
}
