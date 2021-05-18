exports.get_selection = (_, res) => {
    res.render('add/selection.html')
}

exports.get_by_text = (_, res) => {
    res.render('add/by_text.html')
}

exports.get_image_upload = (_, res) => {
    res.render('add/by_image/upload.html')
}

exports.get_image_od_check = (_, res) => {
    res.render('add/by_image/od_check.html')
}

exports.get_image_od_correction_omitted = (_, res) => {
    res.render('add/by_image/od_correction_omitted.html')
}

exports.get_image_od_correction_wrong = (_, res) => {
    res.render('add/by_image/od_correction_wrong.html')
}