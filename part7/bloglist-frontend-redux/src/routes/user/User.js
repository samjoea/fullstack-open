import React from 'react';
import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';

const User = () => {
	const match = useMatch('/users/:id');
	const userId = match?.params?.id;
	const users = useSelector((state) => state.users);
	const user = users?.find(user => user.id === userId);

	if (!user) {
		return null;
	}

	return (
		<div className='h-full pb-[4rem]'>
			<h2 className='self-start font-bold text-xl my-3 bg-purple-900 rounded-md py-1 text-center text-white'>{user?.name}</h2>
			<h3 className='pl-3 capitalize font-bold text-xl mb-3'>added blogs</h3>
			<div className='overflow-y-scroll h-[60%] px-3 pb-2'>
				<table className='w-full'>
					<tbody>
						{user?.blogs?.map((blog, idx) => (
							<tr key={blog.id} className='even:bg-gray-400 h-[3rem]'>
								<td>{idx + 1}</td>
								<td>{blog.title}</td>
							</tr>
						))}
					</tbody>
				</table>

			</div>
		</div>
	);
};

export default User;