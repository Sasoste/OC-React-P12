import Button from "./Button";
import Image from 'next/image';
import homeIcon from '/public/logo.png'

const HorizontalNavbar = () => {
    return (
        <nav className="flex flex-row w-full bg-black h-24 items-center pl-7 drop-shadow-lg	z-10">
            <Image src={homeIcon} alt="Home" className="w-44 h-15" />
            <ul className="flex flex-row  justify-around  text-white w-full font-medium text-2xl">
                <Button content="Accueil" linkto="/" />
                <Button content="Profil" linkto="/user" />
                <Button content="Réglages" linkto="/" />
                <Button content="Communauté" linkto="/" />
            </ul>
        </nav>
    )
}

export default HorizontalNavbar;