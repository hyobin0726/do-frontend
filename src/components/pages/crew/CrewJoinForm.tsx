import { CrewJoinFormType } from '@/type/CrewType'
import CrewJoinAgree from './CrewJoinAgree'
import CrewJoinRefuse from './CrewJoinRefuse'

export default function CrewJoinForm({ data }: { data: CrewJoinFormType[] }) {
    return (
        <section>
            {data.map((joinForm, idx) => (
                <div key={idx} className="bg-white p-3  border-b-[1px]">
                    <div className="flex justify-between space-y-3">
                        <div className="flex items-center space-x-3 ">
                            <img src={joinForm.profileUrl} alt="profile" className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="text-lg font-semibold text-gray-800">{joinForm.name}</p>
                                {joinForm.joinMessage.length > 10 ? (
                                    <p className="text-sm text-gray-600">{joinForm.joinMessage.slice(0, 10)}...</p>
                                ) : (
                                    <p className="text-sm text-gray-600">{joinForm.joinMessage}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex space-x-3 ">
                            <CrewJoinAgree joinFormId={joinForm.joinFormId} />
                            <CrewJoinRefuse joinFormId={joinForm.joinFormId} />
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}
