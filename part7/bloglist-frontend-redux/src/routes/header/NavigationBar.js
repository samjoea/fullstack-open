import { useDispatch } from 'react-redux';
import { logOut } from '../../app/reducers/userReducer';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
	const dispatch = useDispatch();
	const getUser = JSON.parse(localStorage.getItem('user'));

	return (
		<div className='w-full'>
			<div className='space-x-5 px-[3rem] flex items-center bg-gray-400'>
				<span>
					<Link className='underline text-purple-900 visited:text-gray-200 ' to='/'>blogs</Link>
				</span>
				<span>
					<Link className='underline text-purple-900 visited:text-gray-200 ' to='/users'>users</Link>
				</span>
				<span>
					{getUser?.name} logged in
				</span>
				<button
					className='border-2 btn'
					data-cy='log-out'
					onClick={() => dispatch(logOut())}
				>
               logout
				</button>
			</div>
		</div>
	);
};

export default NavigationBar;