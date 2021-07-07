import Link from "next/link"

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/daily">
                        <a>Daily</a>
                    </Link>
                </li>
                <li>
                    <Link href="/calendar">
                        <a>Calendar</a>
                    </Link>
                </li>
                <li>
                    <Link href="/goals">
                        <a>Goals</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
export default Nav