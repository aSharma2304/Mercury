import Container from '@/components/custom/Container'
import HeadingPair from '@/components/custom/HeadingPair'
import { AudienceCard } from './components/AudienceCard'
import CustomSearch from '@/components/custom/CustomSearch'

const page = () => {
  return (
    <Container>
      <HeadingPair heading='Audiences' subheading='Create and manage audiences that suit your needs'/>
      <CustomSearch placeholder='Search Audiences'/>
      <section className='flex flex-wrap gap-6  '>
      {Array.from({length:8}).map((item,ind)=><AudienceCard key={ind}/>)}
      </section>
    </Container>
    
  )
}

export default page