import HomeBanner from '@/asset/image/home/home-banner.jpg'
import Image from 'next/image'

const SectionHomeHero = () => {

    return (
        <section className="section-hero-general bg-green-800">
            <Image src={HomeBanner} className="object-fit-cover w-100 h-100" alt="Home Banner"/>
        </section>
    )
}

export default SectionHomeHero;