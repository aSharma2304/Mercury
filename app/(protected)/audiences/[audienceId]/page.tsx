import Container from '@/components/custom/Container';
import { CustomItem } from '@/components/custom/CustomItem';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

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
import {subscribers} from "../../../../utils/sampleSubscribers"


const page = async ({ params }: { params: Promise<{audienceId: string}>  }) => {
const {audienceId}= await params;
const data = []
  return (
   <Container>
    <Card className='bg-neutral-300/26 '>
        <CardHeader>
             <CardTitle className='flex gap-4 text-2xl'>
                Name of Single audience <span className='opacity-50 font-semibold'>#{audienceId}</span>
                
             </CardTitle>
            <CardDescription className='flex gap-3 items-center text-base'>
               <Calendar size={15}/> Created 4 days ago
               <Badge  variant={"secondary"} className="text-lime-800 bg-lime-500/40 rounded-md ">Active</Badge>
            </CardDescription>
        </CardHeader>
        <CardContent className='text-lg'>
            Description of the single audience
        </CardContent>
    </Card>
    <CustomItem/>
    <Card >
        <CardHeader>
             <CardTitle className='flex gap-4 text-2xl'>
                28,500 people make up this audience
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
                subscribers.length?<SubscriberTable></SubscriberTable>:<span>No Subscriber added</span>
            }
        </CardContent>
    </Card>
   </Container>
  )
}

const SubscriberTable = ()=>{
    return <TableComponent columns={columns}  data={subscribers} />
}

export default page