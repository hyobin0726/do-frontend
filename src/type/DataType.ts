export interface HobbyCardType {
    hobbyId: number
    hobbyName: string
    description: string
    imageUrl: string
    fitRate: number
}

export interface ProfileType {
    profileImageUrl: string
    name: string
    profileMessage: string
    birth: string
    gender: string
}

export interface HobbyType {
    hobbyId: number
    hobbyName: string
    description: string
    imageUrl: string
    fitRate: number
}

export interface baseRegion {
    regionId: number
    addressName: string
}

export interface crewInfo {
    crewId: number
    crewName: string
    addressName: string
    currentParticipant: number
    joinType: number
    profileUrl: string
    hashTagList: string[]
}
