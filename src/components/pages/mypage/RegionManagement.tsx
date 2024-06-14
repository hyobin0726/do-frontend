interface RegionManagementProps {
    data: regionData[]
}

interface regionData {
    regionId: number
    addressName: string
}

export default function RegionManagement({ data }: RegionManagementProps) {
    return (
        <>
            {/* {data.map((region) => (
                <div key={region.regionId}>
                    <div>{region.addressName}</div>
                    <div>수정</div>
                    <div>삭제</div>
                </div>
            ))} */}
        </>
    )
}
