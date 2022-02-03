export default
  process.env.NODE_ENV === 'development'
    ? {
      BASE_API: `https://hosos-vs.opensource-technology.com/api`,
      BASE_UPLOAD_API: `https://hosos-vs.opensource-technology.com/api`
    }
    : {
      BASE_API: `${typeof window !== 'undefined' && window.location.origin}/api`,
      BASE_UPLOAD_API: `${typeof window !== 'undefined' && window.location.origin}/api`
    }