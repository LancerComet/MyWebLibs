/**
 * 获取一条 Cookie.
 *
 * @param {string} key Cookie 键名.
 * @returns {string} Cookie 内容.
 */
function getCookie (key: string): string {
  return decodeURIComponent(
    document.cookie.replace(
      new RegExp('(?:(?:^|.*;)\\s*' +
        encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') +
        '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1'
    )
  ) || ''
}

/**
 * 是否拥有目标 Cookie.
 *
 * @param {string} key Cookie 键名.
 * @returns {boolean} 是否拥有目标 Cookie.
 */
function hasCookie (key: string): boolean {
  return (
    new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')
  ).test(document.cookie)
}

/**
 * 删除一个 Cookie.
 *
 * @param {any} key Cookie 键名.
 * @param {any} path Cookie 所属路径.
 * @param {any} domain Cookie 所属域名.
 * @returns {boolean} 是否操作成功.
 */
function removeCookie (key: string, path?: string, domain?: string): boolean {
  if (!key || !hasCookie(key)) {
    return false
  }

  document.cookie = encodeURIComponent(key) +
    '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
    (domain ? '; domain=' + domain : '') +
    (path ? '; path=' + path : '')

  return true
}

/**
 * 设置一条 Cookie.
 *
 * @param {string} key Cookie 键名.
 * @param {string} value Cookie 值.
 * @param {(number | string | Date)} [end] Cookie 有效期, 当传入 Infinity 时设定到 9999 年, 当不传入时为会话 Cookie.
 * @param {string} [path] Cookie 所属路径.
 * @param {string} [domain] Cookie 所属域名.
 * @param {boolean} [isSecure] 是否为 Secure Cookie.
 * @returns {boolean} 是否操作成功.
 */
function setCookie (
  key: string,
  value: string,
  end?: number | string | Date,
  path?: string,
  domain?: string,
  isSecure?: boolean
): boolean {
  if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
    return false
  }

  let expires = ''
  if (end) {
    if (typeof (end) === 'number') {
      expires = end === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + end
    } else if (typeof (end) === 'string') {
      expires = '; expires=' + end
    } else if (end instanceof Date) {
      expires = '; expires=' + end.toUTCString()
    }
  }

  document.cookie = encodeURIComponent(key) +
    '=' +
    encodeURIComponent(value) +
    expires +
    (domain ? '; domain=' + domain : '') +
    (path ? '; path=' + path : '') +
    (isSecure ? '; secure' : '')

  return true
}

export {
  getCookie,
  hasCookie,
  removeCookie,
  setCookie
}
