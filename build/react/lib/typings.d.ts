declare module '*.css' {
  const styles: Record<string, string>
  export = styles
}
declare module '*.less' {
  const styles: Record<string, string>
  export = styles
}

declare module '*.png' {
  const filePath: string
  export = filePath
}
declare module '*.svg' {
  const filePath: string
  export = filePath
}
declare module '*.jpg' {
  const filePath: string
  export = filePath
}
declare module '*.jpeg' {
  const filePath: string
  export = filePath
}
declare module '*.gif' {
  const filePath: string
  export = filePath
}

declare module '*.mp4' {
  const filePath: string
  export = filePath
}
declare module '*.webm' {
  const filePath: string
  export = filePath
}
declare module '*.ogg' {
  const filePath: string
  export = filePath
}
declare module '*.mp3' {
  const filePath: string
  export = filePath
}
declare module '*.wav' {
  const filePath: string
  export = filePath
}
declare module '*.flac' {
  const filePath: string
  export = filePath
}
declare module '*.aac' {
  const filePath: string
  export = filePath
}

declare namespace process {
  const env: {
    NODE_ENV: 'development' | 'production'
  }
}

declare const React: typeof import('react')

declare const memo: typeof React.memo
declare const useState: typeof React.useState
declare const useMemo: typeof React.useMemo
declare const useCallback: typeof React.useCallback
declare const useEffect: typeof React.useEffect
declare const useRef: typeof React.useRef
declare const useContext: typeof React.useContext
declare const useReducer: typeof React.useReducer
declare const useLayoutEffect: typeof React.useLayoutEffect
declare const useImperativeHandle: typeof React.useImperativeHandle

declare const $APP_NAME: string
declare const $APP_VERSION: string
declare const $APP_MODE: 'development' | 'production'
declare const $APP_ENV: 'watch' | 'dev' | 'test' | 'prod'

declare module 'react-redux' {
  export * from 'react-redux/es'
  export interface DefaultRootState {
  }
  export function useSelector<TState = DefaultRootState, Selected = unknown>(
    selector: (state: TState) => Selected,
    equalityFn?: (a: Selected, b: Selected) => boolean | undefined
  ): Selected
}
