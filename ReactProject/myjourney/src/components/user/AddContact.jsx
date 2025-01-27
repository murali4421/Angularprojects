import React, { useState } from "react";
import { Link } from "react-router-dom";
//import ContactList from  "../ContactList";

const DataClear = {
    name : "",
    number : "",
    email : "",
    created_date: ""
}

// function NewContact()
// {
//     const [ContactList, setContactList] = useState([]);
//     const fetchData = ()=> {
//     fetch('./data/data.json')
//     .then((response)=> response.json())
//     .then((data)=> setContactList(data));
//     };
//     useEffect(()=> {
//         fetchData()
//     }, [ContactList]);
// }

let strStyle2 = "font-semibold text-zinc-950 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300";                        
function Contact()
{
    //const [IsFormDataPosted,setIsFormDataPosted ] = useState(false);
    const [formData, setformData] = useState(DataClear);
    
    // function FormDataPublish()
    // {
    //     if(IsFormDataPosted)
    //     {
    //         const contactInfo = {
    //             name : formData.name,
    //             number : formData.number,
    //             email : formData.email,
    //             created_date : Date.now()
    //         }
    //         setformData(contactInfo);
    //     }        
    // };

    return(
    <div class="relative sm:col-span-2 md:col-span-1 xl:col-span-6">
        <div class="relative h-full w-full rounded-xl bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
            <div class="grid h-full w-full justify-items-center overflow-hidden place-items-start justify-items-center p-6 py-8 sm:p-8 lg:p-12">
            <form class="w-full max-w-sm space-y-8">
            <h3 class="text-lg/7 font-semibold tracking-[-0.015em] text-zinc-950 sm:text-base/7 dark:text-white">
                Contact Details</h3>
                <div class="[&amp;>*+[data-slot=control]]:mt-6 [&amp;>[data-slot=text]]:mt-1" role="group" data-headlessui-state="">
                    <div data-slot="control" class="space-y-8">
                        <div
                            class="[&amp;>[data-slot=label]+[data-slot=control]]:mt-3 [&amp;>[data-slot=label]+[data-slot=description]]:mt-1 [&amp;>[data-slot=description]+[data-slot=control]]:mt-3 [&amp;>[data-slot=control]+[data-slot=description]]:mt-3 [&amp;>[data-slot=control]+[data-slot=error]]:mt-3 [&amp;>[data-slot=label]]:font-medium"
                            data-headlessui-state=""
                        >
                            <label
                                data-slot="label"
                                class="select-none text-base/6 text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-white"
                                id="headlessui-label-:R1d9llfalta:"
                                for="headlessui-control-:R19llfalta:"
                                data-headlessui-state=""
                            >
                                Name
                            </label>
                            <span
                                data-slot="control"
                                class="relative block w-full before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent sm:after:focus-within:ring-2 sm:after:focus-within:ring-blue-500 has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-zinc-950/5 before:has-[[data-disabled]]:shadow-none before:has-[[data-invalid]]:shadow-red-500/10"
                            >
                                <input
                                    class="relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-500 data-[invalid]:data-[hover]:dark:border-red-500 data-[disabled]:border-zinc-950/20 dark:data-[hover]:data-[disabled]:border-white/15 data-[disabled]:dark:border-white/15 data-[disabled]:dark:bg-white/[2.5%]"
                                    id="headlessui-control-:R19llfalta:"
                                    data-headlessui-state=""
                                    name="name"
                                    aria-labelledby="headlessui-label-:R1d9llfalta:"
                                    required
                                    onChange={(event)=> setformData({...formData, name : event.target.value})}
                                    value={ formData.name }
                                />
                            </span>
                           </div>
                        <div
                            class="[&amp;>[data-slot=label]+[data-slot=control]]:mt-3 [&amp;>[data-slot=label]+[data-slot=description]]:mt-1 [&amp;>[data-slot=description]+[data-slot=control]]:mt-3 [&amp;>[data-slot=control]+[data-slot=description]]:mt-3 [&amp;>[data-slot=control]+[data-slot=error]]:mt-3 [&amp;>[data-slot=label]]:font-medium"
                            data-headlessui-state=""
                        >
                            <label
                                data-slot="label"
                                class="select-none text-base/6 text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-white"
                                id="headlessui-label-:R1e9llfalta:"
                                for="headlessui-control-:R29llfalta:"
                                data-headlessui-state=""
                            >
                                Mobile No
                            </label>
                            <span
                                data-slot="control"
                                class="relative block w-full before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent sm:after:focus-within:ring-2 sm:after:focus-within:ring-blue-500 has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-zinc-950/5 before:has-[[data-disabled]]:shadow-none before:has-[[data-invalid]]:shadow-red-500/10"
                            >
                                <input
                                    class="relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-500 data-[invalid]:data-[hover]:dark:border-red-500 data-[disabled]:border-zinc-950/20 dark:data-[hover]:data-[disabled]:border-white/15 data-[disabled]:dark:border-white/15 data-[disabled]:dark:bg-white/[2.5%]"
                                    
                                    id="headlessui-control-:R29llfalta:"
                                    data-headlessui-state=""
                                    name="MobileNo"
                                    aria-labelledby="headlessui-label-:R1e9llfalta:"
                                    required
                                    onChange={(event)=> setformData({...formData, number : event.target.value} )}
                                    value={ formData.number }
                                />
                            </span>
                            
                        </div>
                        <div
                            class="[&amp;>[data-slot=label]+[data-slot=control]]:mt-3 [&amp;>[data-slot=label]+[data-slot=description]]:mt-1 [&amp;>[data-slot=description]+[data-slot=control]]:mt-3 [&amp;>[data-slot=control]+[data-slot=description]]:mt-3 [&amp;>[data-slot=control]+[data-slot=error]]:mt-3 [&amp;>[data-slot=label]]:font-medium"
                            data-headlessui-state=""
                        >
                            <label
                                data-slot="label"
                                class="select-none text-base/6 text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-white"
                                id="headlessui-label-:R1e9llfalta:"
                                for="headlessui-control-:R29llfalta:"
                                data-headlessui-state=""
                            >
                                Email Id
                            </label>
                            <span
                                data-slot="control"
                                class="relative block w-full before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent sm:after:focus-within:ring-2 sm:after:focus-within:ring-blue-500 has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-zinc-950/5 before:has-[[data-disabled]]:shadow-none before:has-[[data-invalid]]:shadow-red-500/10"
                            >
                                <input
                                    class="relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-500 data-[invalid]:data-[hover]:dark:border-red-500 data-[disabled]:border-zinc-950/20 dark:data-[hover]:data-[disabled]:border-white/15 data-[disabled]:dark:border-white/15 data-[disabled]:dark:bg-white/[2.5%]"
                                    
                                    id="headlessui-control-:R29llfalta:"
                                    data-headlessui-state=""
                                    name="EmailId"
                                    aria-labelledby="headlessui-label-:R1e9llfalta:"
                                    onChange={(event)=> setformData({...formData, email : event.target.value} )}
                                    value={ formData.email }
                                />
                            </span>
                            
                        </div>
                    </div>
                </div>
                
                <Link
                    class="w-full relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6 focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500 data-[disabled]:opacity-50 [&amp;>[data-slot=icon]]:-mx-0.5 [&amp;>[data-slot=icon]]:my-0.5 [&amp;>[data-slot=icon]]:size-5 [&amp;>[data-slot=icon]]:shrink-0 [&amp;>[data-slot=icon]]:text-[--btn-icon] [&amp;>[data-slot=icon]]:sm:my-1 [&amp;>[data-slot=icon]]:sm:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hover]:[--btn-icon:ButtonText] border-transparent bg-[--btn-border] dark:bg-[--btn-bg] before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-[--btn-bg] before:shadow dark:before:hidden dark:border-white/5 after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.lg)-1px)] after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)] after:data-[active]:bg-[--btn-hover-overlay] after:data-[hover]:bg-[--btn-hover-overlay] dark:after:-inset-px dark:after:rounded-lg before:data-[disabled]:shadow-none after:data-[disabled]:shadow-none text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)] dark:text-white dark:[--btn-bg:theme(colors.zinc.600)] dark:[--btn-hover-overlay:theme(colors.white/5%)] [--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)] cursor-default"
                    type="button"
                    to={{ pathname : "/", state : formData}}
                    data-headlessui-state="" 
                > Add
                    <span class="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden" aria-hidden="true">

                    </span>
                </Link>
                <p data-slot="text" class="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">
                    
                    <Link to='/'  class={strStyle2}>Contact List</Link>
                </p>
            </form>
        </div>
    </div>
</div>);
}
export default Contact;