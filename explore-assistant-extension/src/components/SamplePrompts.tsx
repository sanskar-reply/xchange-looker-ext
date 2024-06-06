import { Box, Card, Heading, Paragraph } from '@looker/components'
import React from 'react'

interface SamplePromptsProps {
  handleSubmit: (prompt: string) => void
}
const SamplePrompts = ({ handleSubmit }: SamplePromptsProps) => {
  const categorizedPrompts = [
    {
      category: 'Order by revenue',
      prompt: 'What are the top movies?',
      color: 'blue',
    },
    {
      category: 'Rating Analysis',
      prompt:
        'Movies that have more than 4 stars?',
      color: 'green',
    },
    {
      category: 'Period Comparison',
      prompt:
        'Total revenue for the movies by category this year compared to last year in a line chart with year pivoted',
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

export default SamplePrompts