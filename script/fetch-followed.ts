// @ts-nocheck
const fetchFollowed = async () => {
  var d = Object.getOwnPropertySymbols;
  var m = Object.prototype.hasOwnProperty,
    w = Object.prototype.propertyIsEnumerable;
  var f = (e, r) => {
    var o = {};
    for (var t in e) m.call(e, t) && r.indexOf(t) < 0 && (o[t] = e[t]);
    if (e != null && d)
      for (var t of d(e)) r.indexOf(t) < 0 && w.call(e, t) && (o[t] = e[t]);
    return o;
  };
  function a(e) {
    return new Promise((r) => {
      setTimeout(r, e);
    });
  }
  function _(e) {
    let o = `; ${document.cookie}`.split(`; ${e}=`);
    return o.length !== 2 ? null : o.pop().split(";").shift();
  }
  function c(e) {
    let r = _("ds_user_id");
    return e === void 0
      ? `https://www.instagram.com/graphql/query/?query_hash=3dec7e2c57367ef3da3d987d89f9dbc8&variables={"id":"${r}","include_reel":"true","fetch_mutual":"false","first":"24"}`
      : `https://www.instagram.com/graphql/query/?query_hash=3dec7e2c57367ef3da3d987d89f9dbc8&variables={"id":"${r}","include_reel":"true","fetch_mutual":"false","first":"24","after":"${e}"}`;
  }
  var y = async () => {
    let e = [],
      r = c(),
      o = !0,
      t = 0,
      l = 0;
    for (; o; ) {
      let s;
      try {
        let n = await fetch(r),
          { data: i } = await n.json();
        s = i.user.edge_follow;
      } catch (n) {
        console.error(n);
        continue;
      }
      (o = s.page_info.has_next_page),
        (r = c(s.page_info.end_cursor)),
        (t += s.edges.length),
        s.edges.forEach((n) => {
          let u = n.node,
            { reel: i } = u,
            p = f(u, ["reel"]);
          e.push(p);
        });
      let g = s.count,
        h = Math.floor((t / g) * 100);
      console.log(`\u{1F41E} > loading.. ${h}%`),
        await a(Math.floor(Math.random() * (1e3 - 600)) + 1e3),
        l++,
        l > 6 &&
          ((l = 0),
          console.log("Sleeping 10 secs to prevent getting temp blocked"),
          await a(1e4));
    }
    return (
      console.log("\u{1F41E} > followed users:", JSON.stringify(e, null, 2)), e
    );
  };
  return await y();
};

export default fetchFollowed;
