import React from 'react'
import BlogCard from '../BlogCard'
import Title from '../../Title'
import { useStaticQuery, graphql } from 'gatsby'
import styles from './index.module.css'

const getPosts = graphql`
    query {
        posts: allContentfulPost (sort:{fields:published, order:DESC}){
        edges {
            node {
                published(formatString: "MMMM Do, YYYY")
                createdAt(formatString:"LLLL")
                title
                slug
                id: contentful_id
                image {
                    fluid {
                        ...GatsbyContentfulFluid
                    }
                }
            }
        }
    }
}
`

const BlogList = () => {
    const { posts } = useStaticQuery(getPosts)
    console.log(posts)

    return (
        <section className={styles.blog}>
            <Title title="our" subtitle="blog" />
            <div className={styles.center}>
                {posts.edges.map(({ node }) => {
                    return <BlogCard key={node.id} blog={node} />
                })}
            </div>
        </section>
    )
}

export default BlogList
