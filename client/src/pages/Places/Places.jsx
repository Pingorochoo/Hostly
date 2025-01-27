import { Link, useParams } from 'react-router-dom'
import PlaceForm from './components/PlaceForm';


const Places = () => {
    const { action } = useParams()
    return (
        <div>
            {action === undefined && (
                <>
                    <div className='text-center'>
                        <Link className='inline-flex gap-1 bg-primary text-white py-2 pr-6 pl-4 rounded-full mt-8' to='/account/places/new'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add new place</Link>
                    </div>
                </>
            )}
            {(action === 'new' || action === 'update') && (
                <div>
                    <PlaceForm />
                </div>
            )}
        </div>
    )
}

export default Places