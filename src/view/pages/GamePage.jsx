import { Link } from 'react-router-dom'
import { Card, Col, Row } from 'antd'
import Menu from '../menu/Menu'
import gamesData from '../../json/games.json'
import './GamePage.css'

export default function GamePage() {
    // json 檔寫越下面資料，在卡片排序越上面
    const gamesList = (gamesData || []).slice().reverse()

    // 資料少時自動加寬
    const getColProps = () => {
        if (gamesList.length === 1) return { xs: 24, sm: 20, md: 16, lg: 14 }
        if (gamesList.length === 2) return { xs: 24, sm: 16, md: 12, lg: 10 }
        return { xs: 24, sm: 12, md: 8, lg: 8 }
    }
    const colProps = getColProps()

    return (
        <div className="game-page">
            <Link to="/home" className="logo-link">
                <img src="/img/mg2.png" className="mg-logo" alt="TMGC Logo" />
            </Link>

            <div className="bg-cha">
                <img src="/img/girl.png" className="left-img" alt="" />
                <img src="/img/wolf.png" className="right-img" alt="" />
            </div>

            <Menu />

            <main className="game-container">
                <div className="arcade-header">
                    <h1 className="arcade-title">自造遊戲</h1>
                    <h1 className="arcade-title-eng">Games</h1>
                </div>

                <div className="game-cards-scroll-wrap">
                    <Row gutter={[20, 20]} justify="center" className="game-cards-row">
                        {gamesList.map((game, index) => (
                            <Col key={`${game.id}_${index}`} {...colProps} className="game-col">
                                <Card
                                    className="game-card"
                                    hoverable
                                    onClick={() => game.link && window.open(game.link, '_blank')}
                                >
                                    <div className="game-card-beam" />
                                    <h3 className="game-card-title">{game.title}</h3>
                                    {game.description && <p className="game-card-desc">{game.description}</p>}
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </main>

            <footer className="site-footer">© TNUA MUSIC GAME CLUB 2nd</footer>
        </div>
    )
}