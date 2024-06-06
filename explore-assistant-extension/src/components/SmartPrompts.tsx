import { Box, Card, Heading, Paragraph } from '@looker/components'
import React from 'react'

interface SmartPromptsProps {
  handleSubmit: (prompt: string) => void
}
const SmartPrompts = ({ handleSubmit }: SmartPromptsProps) => {
  const categorizedPrompts = [
    {
      category: 'Top 10 taglines',
      prompt: 'What are the top 10 popular taglines for movies?',
      color: 'blue',
    },
    {
      category: 'No. of movies, per genre per year',
      prompt: 'Number of movies in each year, pivot by genre, show it to me as a stacked column chart',
      color: 'green',
    },
    {
      category: 'Stacked bar chart',
      prompt: 'Number of movies in each year, pivot by production companies, show it to me as a stacked bar chart.',
      color: 'red',
    },
    {
      category: 'Production Company analysis',
      prompt: 'Give me a line visualisation with the highest average revenue between 3 billion and 1 billion and their production company.',
      color: 'blue',
    },
    {
      category: 'Ordered by Top-down Revenue',
      prompt: 'What are the top 20 movies in terms of average revenue, order by the most successful movies and show me a bar graph',
      color: 'green',
    },
    {
      category: 'Rating Analysis',
      prompt: 'Movies that have more than 4 stars in the year range 2021-2023, order in ascending order',
      color: 'red',
    },
  ]
  return (
    <div>
      {categorizedPrompts.map((item, index: number) => (
        <Box
          cursor="pointer"
          key={index}
          onClick={() => {
            handleSubmit(item.prompt)
          }}
        >
          <Card border={'ui1'} fontSize={'small'} m="u1" px="u2" py="u4" style={{height:'auto'}}>
            <Heading
              fontSize={'small'}
              fontWeight={'semiBold'}
              style={{ color: `${item.color}` }}
            >
              {item.category}
            </Heading>
            <Paragraph mt="u2">{item.prompt}</Paragraph>
          </Card>
        </Box>
      ))}
    </div>
  )
}

export default SmartPrompts