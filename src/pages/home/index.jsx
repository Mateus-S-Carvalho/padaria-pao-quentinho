import { useState } from 'react'
import Logotipo from '../../assets/Logotipo-folhas.png'
import PaoFrances from '../../assets/Pao-frances.jpg'
import Baguete from '../../assets/baguete-de-frango.jpeg'
import BoloDeCenoura from '../../assets/bolo-de-cenoura.jpg'
import BoloDeChocolate from '../../assets/bolo-chocolate.png'
import LancheNatural from '../../assets/lanche-natural.webp'
import Carolina from '../../assets/Carolina-recheada-com-doce-de-leite.jpg'
import Pudding from '../../assets/custard-pudding.jpg'
import RosquinhaDeChocolate from '../../assets/roscaDeChocolate.jpg'
import './style.css'

function Home() {

  return (
    <>
      <div className='barraGeral'>
        <img src={Logotipo} className='embaixo' />
        <p>PADARIA PÃO QUENTINHO</p>
        <input type='text' id='barraPesquisa' className='embaixo' placeholder='Pesquisa' />
        <button type='button' className='buttonGeral'>Home</button>
        <button type='button' className='buttonGeral'>Home</button>
        <button type='button' className='buttonGeral'>Home</button>
      </div>

      <div className='hero'>
        <p className='textHero'>Pão quentinho na sua porta</p>
        <button type='button' className='falarBtn'>Fale conosco</button>
      </div>

      <div className='produtos'>

        <div className='Card'>
          <img src={PaoFrances}></img>
          <p className='nomeProduto'>Pão Frances</p>
          <p className='descricao'>Pão quentinho para sua manhã</p>
          <p className='valor'>R$ 0.50 UN</p>
        </div>

        <div className='Card'>
          <img src={Baguete}></img>
          <p className='nomeProduto'>Baguete de frango</p>
          <p className='descricao'>Seu lachinho da tarde</p>
          <p className='valor'>R$ 10,50</p>
        </div>

        <div className='Card'>
          <img src={BoloDeCenoura}></img>
          <p className='nomeProduto'>Bolo de cenoura</p>
          <p className='descricao'>Aquele bolinho para adoçar sua tarde</p>
          <p className='valor'>R$ 7,50 Fatia</p>
        </div>

        <div className='Card'>
          <img src={BoloDeChocolate}></img>
          <p className='nomeProduto'>Bolo de chocolate</p>
          <p className='descricao'>Um bolinho gostoso que todo mundo gosta</p>
          <p className='valor'>R$ 7,50 Fatia</p>
        </div>

        <div className='Card'>
          <img src={LancheNatural}></img>
          <p className='nomeProduto'>Lanche natural de frango</p>
          <p className='descricao'>Aquele lanchinho para matar a fome da manhã</p>
          <p className='valor'>R$ 9,50</p>
        </div>

        <div className='Card'>
          <img src={Carolina}></img>
          <p className='nomeProduto'>Carolina</p>
          <p className='descricao'>O doce para comer após o almoço</p>
          <p className='valor'>R$ 1,50 cada</p>
        </div>

        <div className='Card'>
          <img src={Pudding}></img>
          <p className='nomeProduto'>Pudding</p>
          <p className='descricao'>O doce que adoça sua vida</p>
          <p className='valor'>R$ 7,50 Fatia</p>
        </div>

        <div className='Card'>
          <img src={RosquinhaDeChocolate}></img>
          <p className='nomeProduto'>Rosquinha de chocolate</p>
          <p className='descricao'>O doce que a Giovanna adora 😍</p>
          <p className='valor'>R$ 3,00</p>
											<p className='Pessoa'> GOSTOSA da giovanna 🤭</p>
        </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    </>
  )
}

export default Home
