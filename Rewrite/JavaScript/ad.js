const version = 'V2.0.127';
const otherUrls = {
    "v2/ad/preload": "removeAdPreload",
};
function removeAdPreload(e) {
    if (!e.ads) return e;
    for (let t of (e.last_ad_show_interval = 86400, e.ads)) t.start_time = 2681574400, t.end_time = 2681660799, t.display_duration = 0, t.daily_display_cnt = 0, t.total_display_cnt = 0;
    return e
}