'use client'
import Container from '@/components/custom/Container';
import { CustomItem } from '@/components/custom/CustomItem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, PencilRuler } from 'lucide-react';
import { formatDistanceToNow } from "date-fns";

import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select"
import CustomSearch from '@/components/custom/CustomSearch';
import { Button } from '@/components/ui/button';
import { ExcelSvg } from '@/components/custom/ExcelSvg';
import { TableComponent } from '@/components/custom/TableComponent';
import {columns} from "./subscribersColumns"
import { getAudience, getSubscribers } from '@/app/actions/audienceActions/audience';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AudienceType } from '../page';
import { AddAudience } from '../components/CreateAudience';

export type Subscriber = {
  id: string;
  name: string | null;
  email: string;
  created_at: Date;
  audience_id: string;
  isUnsubscribed: boolean;
};


const page = () => {

const params= useParams();
const audienceId =
  typeof params.audienceId === "string"
    ? params.audienceId
    : params.audienceId?.[0];

const [audience,setAudience]= useState<AudienceType | undefined>(undefined);
const [subs,setSubs]= useState<any>([]);
const [allSubs,setAllSubs]= useState<any>([]);
const [message,setMessage]= useState<string>("");

const fetchData = async(audienceId:string)=>{
    const res = await  getAudience(audienceId);
    const subscribersResult = await getSubscribers(audienceId);
    setAudience(res?.audience);
    setSubs(subscribersResult?.subscribers);
    setAllSubs(subscribersResult?.subscribers);
    console.log("got subs",subscribersResult?.subscribers )
    setMessage(res?.message)
}

const updateAudience = (input: AudienceType | AudienceType[]) => {
  if (Array.isArray(input)) {
    setAudience(input[0])
  } else {
    setAudience(input)
  }
}

useEffect(()=>{
    if(!audienceId) return ;
    fetchData(audienceId);
},[audienceId])

if(!audience){
    return <div>{message}</div>
}

const dateTime = formatDistanceToNow(audience?.created_at ?? new Date(), {
  addSuffix: true
});
  return (
   <Container>
    <Card className='bg-neutral-50/5 '>
        <CardHeader>
             <CardTitle className='flex gap-4 text-2xl items-end'>
                {audience?.name} <span className='opacity-50 text-sm font-thin'>#{audienceId}</span>
                
             </CardTitle>
            <CardDescription className='flex gap-3 items-center text-base'>
               <Calendar size={15}/> {dateTime}
        </CardDescription>
        </CardHeader>
        <CardContent className='text-lg flex justify-between'>
            {audience?.description}
            <AddAudience
                audienceId={audienceId}
                oldInfo={{ title: audience.name, description: audience.description }}
                setItem={updateAudience}
            />
        </CardContent>
    </Card>
    <CustomItem audienceId={audienceId}/>
    <Card >
        <CardHeader>
             <CardTitle className='flex gap-4 text-2xl'>
                {audience?.subscriber_count} people make up this audience
             </CardTitle>
             <CardDescription className='flex gap-4 justify-between '>
                <section className='flex gap-4'>
                <CustomSearch
                    searchField="name"
                    placeholder="Search Subscribers"
                    sourceItems={allSubs}
                    setFilteredItems={setSubs}
                    />
                <Select value={"all"} >
                <SelectTrigger className="w-45">
                    <SelectValue placeholder="Select range" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">All time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="last_week">Last week</SelectItem>
                    <SelectItem value="last_month">Last month</SelectItem>
                    <SelectItem value="last_year">Last year</SelectItem>
                </SelectContent>
                </Select>
                </section>
                <Button variant={ 'outline'}>
                    Export xlsx <ExcelSvg />
                </Button>

             </CardDescription>
        </CardHeader>
        <CardContent className='text-lg'>
            {
                audience?.subscriber_count !==0 ?<SubscriberTable subscribers = {subs|| []}></SubscriberTable>:<span>No Subscriber added</span>
            }
        </CardContent>
    </Card>
   </Container>
  )
}

const SubscriberTable = ({subscribers}:{subscribers:Subscriber[]  })=>{
    return <TableComponent columns={columns}  data={subscribers } />
}

export default page