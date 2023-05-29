import { useQuery } from '@tanstack/react-query';
import React from 'react';
import userServices from '../../services/users';
import { Link } from 'react-router-dom';

const Users = () => {
	const { data: users } = useQuery({
		queryKey: ['users'],
		queryFn: userServices.getAll,
	});

	return (
		<div className='flex flex-col h-[50%] items-center justify-center'>
			<div className='self-start font-bold text-xl my-[2rem] text-white bg-purple-900 py-1 w-full rounded-md text-center'>Users</div>
			<table className='border-2 border-purple-900 w-full h-[80%] text-center'>
				<thead className='bg-purple-900 text-white'>
					<tr>
						<th>User Name</th>
						<th>Blogs Created</th>
					</tr>
				</thead>
				<tbody>
					{
						users?.map(user => {
							return (
								<tr key={user.id} className='even:bg-gray-400'>
									<td>
										<Link
											className='underline text-purple-900 visited:text-gray-900 hover:text-purple-900'
											to={`/users/${user.id}`}>
											{user.username}
										</Link>
									</td>
									<td>{user.blogs.length}</td>
								</tr>
							);
						})
					}
				</tbody>
			</table>
		</div>
	);
};

export default Users;