import { createClient } from 'contentful'
import ArticleCard from '../../components/ArticleCard'

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
    console.log(article)
    return (
        <div>
            <h1>Blog</h1>
            <div className='article-list'>
                {article.map(
                    article => (
                        <ArticleCard key={article.sys.id} article={article} />
                    )
                )}
            </div>
        </div>
    )
}
