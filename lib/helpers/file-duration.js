// music-metadata is ESM-only, so it has to be loaded with a dynamic import
function fileDuration(path) {
  return import('music-metadata')
      .then((musicMeta) => musicMeta.parseFile(path, { duration: true }))
      .then((info) => {
        return Math.ceil(info.format.duration * 1000);
      })
}

module.exports = fileDuration;
