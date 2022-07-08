import { createClient } from 'contentful'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: 'article'
    })
    const paths = res.items.map(item => {
        return {
            params: { slug: item.fields.slug }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { items } = await client.getEntries({
        content_type: 'article',
        'fields.slug': params.slug
    })
    return {
        props: { article: items[0] }
    }
}

export default function ArticleDetails({article}) {
    const router = useRouter()
    console.log(article)
    const { titleArticle, slug, description, articleCover, articleContent, publicationDate } = article.fields

    return (

        <div>
            <p className="back" onClick={() => router.back()}>
                <AiOutlineArrowLeft /> Retour
            </p>
            <div className="banner">
                <Image
                    src={'https:' + articleCover.fields.file.url}
                    height={articleCover.fields.file.details.image.height}
                    width={articleCover.fields.file.details.image.width}
                />
            </div>
            <div className="content">
                {documentToReactComponents(articleContent)}

            </div>

        </div>
    )
}