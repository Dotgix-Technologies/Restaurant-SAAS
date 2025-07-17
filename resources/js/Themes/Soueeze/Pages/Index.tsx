import MainSoueezLayout from '../Layout';
import HeroSection from "../components/HeroSection"
import OurStorySection from "../components/OurStorySection"
import HighlightSection from "../components/HighlightSection"
import ItemsSection from "../components/ItemsSection"
import HandCraftedBowls from "../components/HandCraftedBowls"
import Rewards from "../components/Rewards"
import Gallery from "../components/Gallery"

export default function Index() {
    
    return (
        <main>
            <MainSoueezLayout>
                <HeroSection />
                <OurStorySection />
                <HighlightSection />
                <ItemsSection />
                <HandCraftedBowls />
                <Rewards />
                <Gallery />
            </MainSoueezLayout>
        </main>
    )
}
