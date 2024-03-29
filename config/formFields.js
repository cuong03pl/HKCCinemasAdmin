export const formFields = {
    film: [
            {title: "Tên phim", id: "title", placeholder: "Nhập tên phim", isText: true},
            {title: "Chi tiết phim", id: "detail", placeholder: "Nhập chi tiết phim", isText: true},
            {title: "Chi tiết phim", id: "synopsis", placeholder: "Nhập chi tiết phim", isText: true},
            {title: "Độ tuổi giới hạn", id: "ageLimit", placeholder: "Nhập độ tuổi giới hạn", isText: true},
            {title: "Thời gian phim ( phút )", id: "duration", placeholder: "Nhập thời gian phim", isText: true},
            {title: "Quốc gia", id: "country", placeholder: "Nhập quốc gia", isText: true},
            {title: "Đánh giá phim", id: "rating", placeholder: "Nhập đánh giá phim", isText: true},
            {title: "Thời gian phát hành", id: "releaseDate", placeholder: "Nhập thời gian phát hành", isDate: true},
            {title: "Đạo diễn", id: "director", placeholder: "Nhập tên đạo diễn", isText: true},
            {id: "", placeholder: "", isHidden: true},
            {title: "Thể loại", id: "categoryIds", placeholder: "Chọn thể loại", isSelect: true},
            {title: "Ảnh phim", id: "image", placeholder: "Nhập ảnh phim", isFile: true},
        ],
    user: [
        {title: "Tài khoản", id: "username", placeholder: "Nhập tài khoản", isText: true},
        {title: "Mật khẩu", id: "password", placeholder: "Nhập mật khẩu", isText: true  },
    ],
    cinemas: [
        {title: "Tên rạp", id: "name", placeholder: "Nhập tên rạp", isText: true},
        {title: "Địa chỉ rạp", id: "address", placeholder: "Nhập địa chỉ rạp", isText: true},
        {title: "Ảnh rạp", id: "image", placeholder: "Nhập ảnh rạp", isFile: true},
    ],
    actor: [
        {title: "Tên diễn viên", id: "name", placeholder: "Nhập tên diễn viên", isText: true},
        {title: "Phim", id: "filmIds", placeholder: "Chọn phim", isSelect: true},
        {title: "Ảnh diễn viên", id: "image", placeholder: "Nhập ảnh diễn viên", isFile: true},
    ],
    category: [
        {title: "Tên thể loại", id: "name", placeholder: "Nhập tên thể loại", isText: true},
    ],

}