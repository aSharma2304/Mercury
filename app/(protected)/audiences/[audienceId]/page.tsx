import Container from '@/components/custom/Container';
import { CustomItem } from '@/components/custom/CustomItem';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { formatDistanceToNow } from "date-fns";

import {
Select,
SelectContent,
SelectGroup,
SelectItem,
SelectLabel,
SelectTrigger,
SelectValue,
} from "@/components/ui/select"
import CustomSearch from '@/components/custom/CustomSearch';
import { Button } from '@/components/ui/button';
import { ExcelSvg } from '@/components/custom/ExcelSvg';
import { TableComponent } from '@/components/custom/TableComponent';
import {columns} from "./subscribersColumns"
import { getAudience, getSubscribers } from '@/app/actions/audienceActions/audience';

export type Subscriber = {
  id: string;
  name: string | null;
  email: string;
  created_at: Date;
  audience_id: string;
  isUnsubscribed: boolean;
};


const page = async ({ params }: { params: Promise<{audienceId: string}>  }) => {
const {audienceId}= await params;

const res = await getAudience(audienceId);
const subscribersResult = await getSubscribers(audienceId);
console.log("subscribersResult",subscribersResult);

if(res.status==="failed"){
    return <div>{res.message}</div>
}

const details = res.audience;
const dateTime = formatDistanceToNow(details?.created_at ?? new Date(), {
  addSuffix: true
});
  return (
   <Container>
    <Card className='bg-neutral-300/26 '>
        <CardHeader>
             <CardTitle className='flex gap-4 text-2xl items-end'>
                {details?.name} <span className='opacity-50 text-sm font-thin'>#{audienceId}</span>
                
             </CardTitle>
            <CardDescription className='flex gap-3 items-center text-base'>
               <Calendar size={15}/> {dateTime}
        </CardDescription>
        </CardHeader>
        <CardContent className='text-lg'>
            {details?.description}
        </CardContent>
    </Card>
    <CustomItem audienceId={audienceId}/>
    <Card >
        <CardHeader>
             <CardTitle className='flex gap-4 text-2xl'>
                {details?.subscriber_count} people make up this audience
             </CardTitle>
             <CardDescription className='flex gap-4 justify-between '>
                <section className='flex gap-4'>
                <CustomSearch placeholder='Search Subscribers'></CustomSearch>
                <Select value={"all"} >
                <SelectTrigger className="w-[180px]">
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
                details?.subscriber_count !==0 ?<SubscriberTable subscribers = {subscribersResult.subscribers || []}></SubscriberTable>:<span>No Subscriber added</span>
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