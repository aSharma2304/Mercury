import Container from '@/components/custom/Container'
import HeadingPair from '@/components/custom/HeadingPair'
import MailCard from './_components/MailCard'
import {Button} from "@/components/ui/button"
import Link from 'next/link'

const page = () => {
  return (

    <Container>
      <HeadingPair heading='Mails' subheading='Create your mail templates that suit your usecase'/>
      <div className='flex justify-end'><Link href={"/mails/create"}><Button variant={ 'outline'}>Create Template</Button></Link></div>
    <section className='w-full xl:max-w-[70%] flex flex-col gap-4'>
      {Array.from({length:3}).map((ele,index)=>{
        return <MailCard key={index} title='Card Title' description='description comes here' tags={["abc","promotion","weekly"]}/>
      })}
    </section>
    </Container>
  )
}

export default page