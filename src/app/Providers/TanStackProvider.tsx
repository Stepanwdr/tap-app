import type { ReactNode, FC } from "react"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface Props {
  children: ReactNode
}

const TanStackProvider: FC<Props> = ({children}) => {
  const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: 5 * 60 * 1000,
          retry: false,
        },
      },
    })

    return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
    )
 }
 
export default TanStackProvider