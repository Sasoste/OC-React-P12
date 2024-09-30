import Link from 'next/link';

type ButtonProps = {
    content: React.ReactNode;
    linkto: string;
}

const Button = ({ content, linkto }: ButtonProps) => {
    return (
        <li className="cursor-pointer">
            <Link href={linkto}>
                {content}
            </Link>
        </li>
    )
}

export default Button;  