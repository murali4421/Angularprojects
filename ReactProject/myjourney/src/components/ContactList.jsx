// Filename - Home.jsx
import React from "react";
// Importing Link from react-router-dom to 
// navigate to different end points.
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";


function Home(props)
{
    
    const [ContactBook, setContactBook] = useState([{
        name : "",
        number : "",
        email : "",
        created_date: ""        
    }]);

	const fetchContact = useCallback(()=> {
		fetch('./data/data.json')
		.then((response)=> response.json())
		.then((data)=> setContactBook(data));
	},[]);
	
	useEffect(()=> {
		fetchContact()
	},[fetchContact]);

    
    // if(location.state !=="")
    // {
    //     ContactBook.push(location.state);
    // }   

    return (
		// <div >
		// 	<h1>Home Page</h1>
		// 	<br />
		// 	<ul>
		// 		<li>
		// 			{/* Endpoint to route to Home component */}
		// 			<Link to="/">Home</Link>
		// 		</li>
		// 		<li>
		// 			{/* Endpoint to route to About component */}
		// 			<Link to="/about">About</Link>
		// 		</li>
		// 		<li>
		// 			{/* Endpoint to route to Contact Us component */}
		// 			<Link to="/contactus">Contact Us</Link>
		// 		</li>
		// 	</ul>

			
		// </div>
<div className="grid h-full w-full justify-items-center overflow-hidden place-items-start justify-items-center p-6 py-8 sm:p-8 lg:p-12">
				<div className="w-full min-w-0">                
                <p class="text-lg/7 font-semibold tracking-[-0.015em] text-zinc-950 sm:text-base/7 dark:text-white">
                    <Link to='/user/AddContact'>New Contact</Link>
                </p>                
				<div className="flow-root">
						<div className="inline-block min-w-full align-middle sm:px-[--gutter]">
                        
						<table class="min-w-full text-left text-sm/6">                            
        <thead class="text-zinc-500 dark:text-zinc-400">
        <tr class="">
            <th class="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-2 sm:last:pr-2">Created Date</th>
            <th class="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-2 sm:last:pr-2">Name</th>
            <th class="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-2 sm:last:pr-2">Mobile No</th>
            <th class="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-2 sm:last:pr-2">Email Id</th>
            
            <th class="relative w-0 border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-2 sm:last:pr-2">
                <span class="sr-only">Actions</span>
            </th>
        </tr>
    </thead>
    <tbody>
        {
            ContactBook.map(contact=> 
                <tr class="">
                <td class="text-zinc-500 dark:text-zinc-400 relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-2 sm:last:pr-2">
                    Mar 6, 2023
                </td>
                <td class="relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-2 sm:last:pr-2">
                    <div class="flex items-center gap-2">                    
                        <span class="font-medium">{ contact.name }</span>
                    </div>
                </td>
                <td class="relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-2 sm:last:pr-2">
                { contact.number }</td>
                <td class="text-zinc-500 relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-2 sm:last:pr-2">
                    <span
                        class="-my-0.5 inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15"
                    > { contact.email }
                    </span>
                </td>
                <td class="relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 py-4 sm:first:pl-2 sm:last:pr-2">
                    <div class="-mx-3 -my-1.5 sm:-mx-2.5">                    
                        <Link to='/user/AddContact' 
                           className="relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6 focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500 data-[disabled]:opacity-50 [&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-0.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon] [&>[data-slot=icon]]:sm:my-1 [&>[data-slot=icon]]:sm:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hover]:[--btn-icon:ButtonText] border-zinc-950/10 text-zinc-950 data-[active]:bg-zinc-950/[2.5%] data-[hover]:bg-zinc-950/[2.5%] dark:border-white/15 dark:text-white dark:[--btn-bg:transparent] dark:data-[active]:bg-white/5 dark:data-[hover]:bg-white/5 [--btn-icon:theme(colors.zinc.500)] data-[active]:[--btn-icon:theme(colors.zinc.700)] data-[hover]:[--btn-icon:theme(colors.zinc.700)] dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] dark:data-[hover]:[--btn-icon:theme(colors.zinc.400)] cursor-default" >
                         Edit
                        </Link>
                    </div>
                </td>
            </tr>
            )
        }
    </tbody>
</table>
</div>
</div>
</div>
</div>
);
};

export default Home;
