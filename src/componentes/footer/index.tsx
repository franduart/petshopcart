import Logo from '../../assets/Logo_Petshop_marrom_ilustrado-removebg-preview.png'

export function Footer(){
    let data = new Date()
    let ano = data.getFullYear()

    return(
        <footer className='flex items-center justify-center flex-col text-center bg-blue-900 text-white pb-4'>
            <img className='w-40' src={Logo} alt="logo" />
            <div>
                <h3>Ubatuba-SP</h3>
                <strong>{Number(ano)}</strong>
            </div>
        </footer>
    )
}