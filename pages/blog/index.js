import { createClient } from 'contentful'
import ArticleCard from '../../components/ArticleCard'
import styled from 'styled-components'

const IndexStyle = styled.div`
.content_container{
    padding: 40px 20px;

    h1{
        text-align:center;
        margin-bottom:40px;
    }
}
`
export async function getStaticProps() {

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    })

    const res = await client.getEntries({ content_type: 'article' })

    return {
        props: {
            article: res.items
        }
    }
}

export default function Articles({ article }) {
    return (
        <IndexStyle>
        <div className="content_container">
            <h1>Blog</h1>
            <div className='article-list'>
                {article.map(
                    article => (
                        <ArticleCard key={article.sys.id} article={article} />
                    )
                )}
            </div>
        </div>
        </IndexStyle>
    )
}
