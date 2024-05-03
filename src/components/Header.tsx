export type HeaderProps = {
    title: String
}

function Header({title}: HeaderProps){
    return(
        <header>
            {title}
        </header>
    )
}

export default Header