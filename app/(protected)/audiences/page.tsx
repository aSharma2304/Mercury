import Container from '@/components/custom/Container'
import HeadingPair from '@/components/custom/HeadingPair'
import { AudienceCard } from './components/AudienceCard'
import CustomSearch from '@/components/custom/CustomSearch'
import { AddSubscribers } from './components/CreateAudience'
import { getAllSubscribers } from '@/app/actions/audienceActions/addSubscribers'

export const revalidate = 60;

const page = async () => {

  const data = await getAllSubscribers() || [];
  console.log("got audiences data",data);

  return (
    <Container>
      <HeadingPair heading='Audiences' subheading='Create and manage audiences that suit your needs'/>
      <section className='w-full flex justify-between'>
      <CustomSearch placeholder='Search Audiences'/>
      <AddSubscribers/>
      </section>
      <section className='flex flex-wrap gap-6  '>
      {data?.map((item)=><AudienceCard item={item}  key={item.id}/>)}
      </section>
    </Container>
    
  )
}

export default page