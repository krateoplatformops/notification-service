const concatUrl = (params) => {
  let url = ''

  for (let i = 0; i < params.length; i++) {
    const p = params[i]
    if (i > 0 && p.toString().length > 0) {
      if (p[0] !== '/' && url[url.length - 1] !== '/') {
        url += '/'
      }
    }
    url += params[i]
  }

  return url
}

const parse = (url) => {
  if (url.indexOf('://') > -1) {
    url = url.split('://')[1]
  }
  return {
    domain: url.split('/')[0].toLowerCase(),
    path: concatUrl(url.split('/').slice(1)),
    pathList: concatUrl(url.split('/').slice(1)).split('/')
  }
}

module.exports = {
  concatUrl,
  parse
}
