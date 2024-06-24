export interface CrewType {
    crewId: string
    name: string
    profileUrl: string
    currentParticipant: number
}

export interface CrewInfoType {
    profileUrl: string
    name: string
    introduction: string
    hashTagList: string[]
    joinType: number
}

export interface CrewMemberType {
    uuid: string
    name: string
    profileUrl: string
    role: number
}

export interface CrewJoinFormType {
    joinFormId: string
    name: string
    profileUrl: string
    joinMessage: string
}
