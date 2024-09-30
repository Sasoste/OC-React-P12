import Button from "./Button";
import Image from 'next/image';
import Meditation from '/public/meditation.png';
import Swimming from '/public/swimming.png';
import Cycling from '/public/cycling.png';
import Bodybuilding from '/public/bodybuilding.png';

const VerticalNavbar = () => {
    return (
        <nav className="w-28 bg-black h-full text-white absolute left-0 flex justify-center">
            <ul className="flex flex-col justify-center items-center h-full">
                <Button content={<Image src={Meditation} alt='meditation button' className="w-16 h-16 mb-5" />} linkto="/" />
                <Button content={<Image src={Swimming} alt='swimming button' className="w-16 h-16 mb-5" />} linkto="/" />
                <Button content={<Image src={Cycling} alt='cycling button' className="w-16 h-16 mb-5" />} linkto="/" />
                <Button content={<Image src={Bodybuilding} alt='bodybuilding button' className="w-16 h-16" />} linkto="/" />
            </ul>
            <span className="-rotate-90 w-[150px] absolute bottom-28 text-xs font-medium">Copyright, SportSee 2020</span>
        </nav>
    )
}

export default VerticalNavbar;