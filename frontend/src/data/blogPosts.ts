import { BlogPost } from '../types/blog';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-thi-truong-1',
    slug: 'bao-cao-thi-truong-bds-q4-2026-don-bay-ha-tang',
    title: 'Báo Cáo Diễn Biến Thị Trường BĐS Q4/2026: Đòn Bẩy Hạ Tầng & Chu Kỳ Bứt Phá Mới',
    excerpt: 'Phân tích chi tiết làn sóng tăng trưởng sau khi Luật Đất Đai mới có hiệu lực, tác động từ tuyến Metro số 1 Bến Thành - Suối Tiên và tiến độ đường Vành đai 3 TP.HCM.',
    category: 'thi-truong',
    categoryName: 'Tin thị trường',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Toàn cảnh đô thị TP. Hồ Chí Minh với hạ tầng giao thông hiện đại và các tòa tháp cao ốc ven sông',
    publishedAt: '25/10/2026',
    readTime: '6 phút đọc',
    views: 8420,
    likes: 356,
    featured: true,
    popular: true,
    author: {
      name: 'Trần Đình Quân',
      role: 'Chuyên gia Phân tích Kinh tế Vi mô & BĐS',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      bio: 'Hơn 12 năm nghiên cứu dữ liệu thị trường và tư vấn chiến lược đầu tư cho các quỹ tài chính lớn.'
    },
    tags: ['Thị trường BĐS', 'Quy hoạch hạ tầng', 'Metro số 1', 'Vành đai 3', 'Luật đất đai'],
    seo: {
      title: 'Báo Cáo Diễn Biến Thị Trường BĐS Q4/2026 | Batdongsan.vn',
      metaDescription: 'Cập nhật phân tích thị trường bất động sản Q4/2026: Biến động giá căn hộ, đất nền và tác động trực tiếp từ hạ tầng giao thông trọng điểm.',
      keywords: ['thị trường bất động sản 2026', 'giá nhà đất tphcm', 'metro bến thành suối tiên', 'vành đai 3', 'đầu tư bđs']
    },
    tableOfContents: [
      { id: 'tong-quan', title: '1. Tổng quan bức tranh thị trường cuối năm 2026', level: 2 },
      { id: 'ha-tang', title: '2. Cú hích từ các dự án hạ tầng giao thông nghìn tỷ', level: 2 },
      { id: 'bien-dong-gia', title: '3. Diễn biến giá bán và tính thanh khoản từng phân khúc', level: 2 },
      { id: 'loi-khuyen', title: '4. Khuyến nghị chiến lược cho nhà đầu tư cá nhân', level: 2 }
    ],
    contentSections: [
      {
        id: 'tong-quan',
        heading: '1. Tổng quan bức tranh thị trường cuối năm 2026',
        paragraphs: [
          'Bước vào quý 4 năm 2026, thị trường bất động sản Việt Nam đang chứng kiến sự thanh lọc và phục hồi rõ nét. Việc bộ 3 luật sửa đổi (Luật Đất đai, Luật Nhà ở, Luật Kinh doanh BĐS) đi vào thực thi đã thiết lập nền tảng pháp lý minh bạch, bảo vệ tối đa quyền lợi người mua ở thực.',
          'Dòng tiền từ kiều hối, tiền gửi tiết kiệm đáo hạn cùng sự tự tin của tầng lớp trung lưu đang dần quay trở lại với các dự án có pháp lý hoàn chỉnh, chủ đầu tư uy tín và sở hữu vị trí kết nối giao thông vượt trội.'
        ],
        highlightBox: {
          title: 'Điểm sáng vĩ mô',
          text: 'Mặt bằng lãi suất vay mua nhà tiếp tục duy trì ở biên độ ổn định 7.5% - 8.5%/năm trong 2 năm đầu, tạo điều kiện thuận lợi cho cả gia đình trẻ an cư lẫn nhà đầu tư dài hạn.',
          type: 'info'
        }
      },
      {
        id: 'ha-tang',
        heading: '2. Cú hích từ các dự án hạ tầng giao thông nghìn tỷ',
        paragraphs: [
          'Hạ tầng luôn là chiếc "kim chỉ nam" cho định giá bất động sản. Tại khu vực phía Đông TP.HCM, việc tuyến Metro số 1 Bến Thành - Suối Tiên vận hành trơn tru đã rút ngắn thời gian di chuyển từ ga Thảo Điền, An Phú về chợ Bến Thành xuống chỉ còn dưới 12 phút.',
          'Song song đó, trục đường Vành đai 3 và mở rộng Quốc lộ 13 đang tạo nên trục giao thương xuyên suốt giữa TP. Thủ Đức, Bình Dương và Đồng Nai, kích hoạt giá trị gia tăng mạnh mẽ cho các cụm dân cư dọc tuyến.'
        ],
        quote: {
          text: 'Bất động sản nằm trong bán kính 500m đến các nhà ga Metro luôn có tốc độ tăng trưởng giá trị trung bình cao hơn từ 15% - 25% so với mặt bằng chung của khu vực.',
          author: 'Viện Nghiên cứu Đô thị & BĐS Đông Nam Á'
        }
      },
      {
        id: 'bien-dong-gia',
        heading: '3. Diễn biến giá bán và tính thanh khoản từng phân khúc',
        paragraphs: [
          'Số liệu khảo sát giao dịch thực tế cho thấy sự phân hóa sâu sắc. Phân khúc căn hộ chung cư cao cấp tại Thảo Điền, Thủ Thiêm và An Phú ghi nhận mức hấp thụ đạt trên 85% giỏ hàng sơ cấp, với mức giá dao động từ 65 - 120 triệu đồng/m².',
          'Dưới đây là bảng thống kê biến động mặt bằng giá các khu vực tiêu biểu trong năm 2026:'
        ],
        table: {
          headers: ['Khu vực / Phân khúc', 'Mặt bằng giá Q1/2026', 'Mặt bằng giá Q4/2026', 'Tỷ lệ tăng trưởng'],
          rows: [
            ['Căn hộ cao cấp Thảo Điền & An Phú', '62 - 75 triệu/m²', '68 - 85 triệu/m²', '+9.7%'],
            ['Biệt thự sinh thái Long Biên (Hà Nội)', '95 - 110 triệu/m²', '105 - 125 triệu/m²', '+11.2%'],
            ['Căn hộ cho thuê Metro số 1', '22 - 28 triệu/tháng', '25 - 32 triệu/tháng', '+13.5%'],
            ['Nhà phố kinh doanh TP. Thủ Đức', '110 - 140 triệu/m²', '118 - 150 triệu/m²', '+7.1%']
          ]
        }
      },
      {
        id: 'loi-khuyen',
        heading: '4. Khuyến nghị chiến lược cho nhà đầu tư cá nhân',
        paragraphs: [
          'Đối với người mua ở thực: Thời điểm hiện tại là cơ hội tốt để chọn lọc các căn hộ đã có sổ hồng hoặc chủ đầu tư bàn giao đúng hạn. Hãy ưu tiên các dự án sở hữu tiện ích khép kín all-in-one.',
          'Đối với nhà đầu tư sinh lời: Nên cân nhắc chiến lược mua nhà tạo dòng tiền cho thuê tức thì thay vì đầu cơ lướt sóng ngắn hạn. Những bất động sản có khả năng khai thác cho thuê đạt tỷ suất từ 5.5% - 7%/năm sẽ là kênh trú ẩn an toàn và tích lũy tài sản vững bền.'
        ],
        checklist: [
          'Kiểm tra kỹ lưỡng giấy chứng nhận quyền sở hữu (Sổ đỏ / Sổ hồng)',
          'Đánh giá thực tế mật độ dân cư và tiện ích xung quanh đã hình thành',
          'Tận dụng các gói bảo lãnh tiến độ và chính sách ân hạn nợ gốc từ ngân hàng uy tín',
          'Không dùng đòn bẩy tài chính vượt quá 50% tổng giá trị tài sản'
        ]
      }
    ],
    relatedPropertyId: 'bds-001',
    relatedPropertyNote: 'Căn hộ Penthouse Masteri Thảo Điền - Vị trí vàng kết nối trực tiếp Metro số 1 và view sông Sài Gòn'
  },
  {
    id: 'post-du-an-1',
    slug: 'review-danh-gia-penthouse-masteri-thao-dien',
    title: 'Đánh Giá Dự Án: Trải Nghiệm Penthouse Masteri Thảo Điền & Tiềm Năng Tăng Giá',
    excerpt: 'Review chi tiết thiết kế thông tầng 280m², tiện ích Sky Pool riêng tư, tính pháp lý sổ hồng và phân tích ưu nhược điểm thực tế cho giới thượng lưu.',
    category: 'du-an',
    categoryName: 'Review dự án',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Không gian phòng khách căn hộ Penthouse sang trọng với trần cao và kính cong panorama nhìn ra sông',
    publishedAt: '22/10/2026',
    readTime: '8 phút đọc',
    views: 6190,
    likes: 284,
    featured: false,
    popular: true,
    author: {
      name: 'Lê Hoàng Nam',
      role: 'Chuyên viên Đánh giá Bất động sản Cao cấp',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
      bio: 'Chuyên khảo sát và review thực địa các dự án Branded Residences và căn hộ hạng sang tại TP.HCM.'
    },
    tags: ['Masteri Thảo Điền', 'Review dự án', 'Penthouse', 'Bất động sản hạng sang', 'Thủ Đức'],
    seo: {
      title: 'Review Chi Tiết Penthouse Masteri Thảo Điền 2026 | Batdongsan.vn',
      metaDescription: 'Khảo sát thực tế Penthouse Masteri Thảo Điền: Đánh giá chi tiết ưu nhược điểm, pháp lý sổ hồng, phí quản lý và tiềm năng sinh lời.',
      keywords: ['review masteri thảo điền', 'penthouse thảo điền', 'mua penthouse sài gòn', 'đánh giá dự án căn hộ']
    },
    tableOfContents: [
      { id: 'vi-tri', title: '1. Vị trí và tính kết nối tại bán đảo Thảo Điền', level: 2 },
      { id: 'thiet-ke', title: '2. Điểm nhấn kiến trúc thông tầng và tiện ích nội khu', level: 2 },
      { id: 'phap-ly', title: '3. Tình trạng pháp lý và phí dịch vụ vận hành', level: 2 },
      { id: 'uu-nhuoc', title: '4. Bảng tổng hợp ưu - nhược điểm khách quan', level: 2 }
    ],
    contentSections: [
      {
        id: 'vi-tri',
        heading: '1. Vị trí và tính kết nối tại bán đảo Thảo Điền',
        paragraphs: [
          'Tọa lạc tại mặt tiền 159 Xa lộ Hà Nội, Masteri Thảo Điền từ lâu đã khẳng định vị thế biểu tượng sống của cộng đồng chuyên gia quốc tế tại TP. Thủ Đức. Điểm cộng lớn nhất của dự án là hành lang kết nối trực tiếp với trung tâm thương mại Vincom Mega Mall và nhà ga số 7 An Phú của tuyến Metro.',
          'Đối với dòng sản phẩm Penthouse tầng cao tháp T5, tầm nhìn không bị che chắn bởi bất kỳ công trình nào, mở ra khung cảnh 270 độ sông Sài Gòn và pháo hoa rực rỡ từ tòa Landmark 81.'
        ]
      },
      {
        id: 'thiet-ke',
        heading: '2. Điểm nhấn kiến trúc thông tầng và tiện ích nội khu',
        paragraphs: [
          'Với diện tích sàn 280m² kết cấu 2 tầng, căn Penthouse sở hữu khoảng thông tầng phòng khách cao tới 6.2 mét. Thiết kế mở sử dụng hệ kính Low-E tràn viền vừa giúp đón trọn vẹn luồng gió mát từ sông, vừa triệt tiêu hoàn toàn tia cực tím và tiếng ồn đô thị.',
          'Đặc biệt, khu vực sky terrace bên ngoài được gia chủ bố trí hồ bơi tràn chân mây mini và khu vực BBQ ngoài trời, tạo nên không gian thư giãn đẳng cấp không kém các resort 5 sao tại Bali hay Maldives.'
        ],
        highlightBox: {
          title: 'Chi tiết nội thất',
          text: 'Toàn bộ nội thất được nhập khẩu trực tiếp từ các thương hiệu hàng đầu nước Ý như sofa Poliform, bàn ăn Minotti và hệ tủ bếp thông minh tích hợp thiết bị Bosch.',
          type: 'tip'
        }
      },
      {
        id: 'phap-ly',
        heading: '3. Tình trạng pháp lý và phí dịch vụ vận hành',
        paragraphs: [
          'Về mặt pháp lý: Khác với nhiều dự án condotel hoặc officetel có thời hạn 50 năm, căn hộ này đã có Sổ hồng sở hữu lâu dài chính chủ của người Việt Nam, sẵn sàng công chứng chuyển nhượng trong ngày.',
          'Phí quản lý vận hành do đơn vị Savills phụ trách hiện ở mức 18.000 VNĐ/m²/tháng, bao gồm toàn bộ dịch vụ bảo vệ 3 lớp, bảo trì thang máy thẻ từ riêng và vệ sinh sảnh lễ tân chuẩn khách sạn quốc tế.'
        ]
      },
      {
        id: 'uu-nhuoc',
        heading: '4. Bảng tổng hợp ưu - nhược điểm khách quan',
        paragraphs: [
          'Để giúp quý khách hàng có cái nhìn đa chiều trước khi đưa ra quyết định mua hoặc đầu tư, đội ngũ batdongsan.vn tổng hợp đánh giá như sau:'
        ],
        table: {
          headers: ['Tiêu chí', 'Ưu điểm nổi bật', 'Nhược điểm cần lưu ý'],
          rows: [
            ['Vị trí & Giao thông', 'Sát vách trạm Metro, kết nối Quận 1 trong 10 phút', 'Đoạn đường Xa lộ Hà Nội giờ cao điểm có lưu lượng xe đông'],
            ['Không gian sống', 'Tầm nhìn sông panorama 270°, hồ bơi Sky Pool riêng', 'Chi phí bảo dưỡng sân vườn và kính trên cao định kỳ'],
            ['Pháp lý & Quyền sở hữu', 'Sổ hồng lâu dài trao tay, sang tên minh bạch', 'Giá trị tài sản lớn, kén tệp khách hàng mua ở thực'],
            ['Tiềm năng sinh lời', 'Nhu cầu thuê từ CEO nước ngoài đạt 80 - 100 tr/tháng', 'Thanh khoản chậm hơn so với căn hộ 2PN thông thường']
          ]
        }
      }
    ],
    relatedPropertyId: 'bds-001',
    relatedPropertyNote: 'Xem thông số chi tiết & hình ảnh thực tế của căn Penthouse Masteri Thảo Điền'
  },
  {
    id: 'post-tai-chinh-1',
    slug: 'bai-toan-vay-mua-nha-tra-gop-2026-dong-tien',
    title: 'Bài Toán Vay Mua Nhà Trả Góp 2026: Cách Tính Lãi Suất & Tối Ưu Dòng Tiền Hàng Tháng',
    excerpt: 'Hướng dẫn công thức tính dư nợ giảm dần, tỷ lệ DTI an toàn và 4 nguyên tắc vàng giúp bạn sở hữu tổ ấm mà không bị áp lực nợ nần đè nặng.',
    category: 'tai-chinh',
    categoryName: 'Tài chính & Pháp lý',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Bàn tính tài chính, hợp đồng mua nhà và hồ sơ ngân hàng với chuyên viên tư vấn tài chính',
    publishedAt: '20/10/2026',
    readTime: '7 phút đọc',
    views: 9150,
    likes: 412,
    featured: false,
    popular: true,
    author: {
      name: 'Nguyễn Thị Minh Châu',
      role: 'Chuyên gia Hoạch định Tài chính Cá nhân CFA',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      bio: 'Tác giả sách "Làm chủ dòng tiền an cư", đồng hành cùng hơn 500 gia đình lập kế hoạch tài chính mua nhà.'
    },
    tags: ['Vay mua nhà', 'Lãi suất ngân hàng', 'Tài chính cá nhân', 'Dòng tiền', 'Trả góp'],
    seo: {
      title: 'Cách Tính Lãi Suất Vay Mua Nhà Trả Góp 2026 | Batdongsan.vn',
      metaDescription: 'Bảng tính chi tiết bài toán vay mua nhà 2026: Công thức tính lãi suất thả nổi, dư nợ giảm dần và chiến lược trả nợ trước hạn tiết kiệm hàng trăm triệu.',
      keywords: ['vay mua nhà trả góp', 'cách tính lãi suất mua nhà', 'tài chính mua nhà', 'vay ngân hàng mua bds']
    },
    tableOfContents: [
      { id: 'nguyen-tac-vang', title: '1. Quy tắc tài chính 28/36 khi vay mua nhà', level: 2 },
      { id: 'so-sanh-lai-suat', title: '2. Lãi suất cố định vs Lãi suất thả nổi theo dư nợ giảm dần', level: 2 },
      { id: 'bang-tinh-mau', title: '3. Bảng tính dòng tiền mẫu: Khoản vay 2 tỷ trong 20 năm', level: 2 },
      { id: 'meo-tiet-kiem', title: '4. Mẹo trả nợ trước hạn để tiết kiệm tối đa tiền lãi', level: 2 }
    ],
    contentSections: [
      {
        id: 'nguyen-tac-vang',
        heading: '1. Quy tắc tài chính 28/36 khi vay mua nhà',
        paragraphs: [
          'Một trong những sai lầm phổ biến nhất của người mua nhà lần đầu là vay tối đa hạn mức mà ngân hàng cho phép (thường lên đến 70% - 80% giá trị căn nhà). Điều này tiềm ẩn rủi ro rất lớn khi lãi suất thị trường có sự biến động sau thời gian ưu đãi.',
          'Các chuyên gia tài chính thế giới luôn khuyến nghị quy tắc 28/36: Tổng số tiền trả góp nhà hàng tháng (gồm gốc + lãi) không nên vượt quá 28% tổng thu nhập gộp của gia đình, và tổng mọi khoản nợ (gồm nhà, xe, thẻ tín dụng) không được vượt quá 36% thu nhập.'
        ],
        highlightBox: {
          title: 'Công thức an toàn',
          text: 'Thu nhập gia đình 50 triệu/tháng -> Khoản trả góp mua nhà lý tưởng tối đa: 50 x 28% = 14 triệu đồng/tháng. Nếu vượt quá mức này, bạn sẽ rơi vào tình trạng căng thẳng tài chính triền miên.',
          type: 'warning'
        }
      },
      {
        id: 'so-sanh-lai-suat',
        heading: '2. Lãi suất cố định vs Lãi suất thả nổi theo dư nợ giảm dần',
        paragraphs: [
          'Hầu hết các ngân hàng thương mại tại Việt Nam (Vietcombank, BIDV, Techcombank, MB Bank) hiện nay đều áp dụng chính sách: Cố định lãi suất ưu đãi trong 12, 18 hoặc 24 tháng đầu (khoảng 6.5% - 7.9%/năm), sau đó chuyển sang lãi suất thả nổi = Lãi suất cơ sở + Biên độ (thường từ 3.0% - 3.5%).',
          'Người vay cần yêu cầu chuyên viên ngân hàng làm rõ: Phương pháp tính theo "Dư nợ ban đầu" hay "Dư nợ giảm dần". Hãy luôn chọn phương án tính theo Dư nợ giảm dần để số tiền lãi giảm dần theo thời gian khi bạn đã trả bớt tiền gốc.'
        ]
      },
      {
        id: 'bang-tinh-mau',
        heading: '3. Bảng tính dòng tiền mẫu: Khoản vay 2 tỷ trong 20 năm',
        paragraphs: [
          'Dưới đây là mô phỏng thực tế cho một khoản vay 2.000.000.000 VNĐ, thời hạn 20 năm (240 tháng), lãi suất ưu đãi năm đầu 7.5%/năm, sau đó thả nổi tạm tính 9.5%/năm:'
        ],
        table: {
          headers: ['Thời gian', 'Gốc hàng tháng', 'Lãi hàng tháng', 'Tổng thanh toán / tháng', 'Dư nợ còn lại'],
          rows: [
            ['Tháng thứ 1', '8.330.000 VNĐ', '12.500.000 VNĐ', '20.830.000 VNĐ', '1.991.670.000 VNĐ'],
            ['Tháng thứ 12', '8.330.000 VNĐ', '11.920.000 VNĐ', '20.250.000 VNĐ', '1.900.000.000 VNĐ'],
            ['Tháng thứ 24 (Thả nổi)', '8.330.000 VNĐ', '14.250.000 VNĐ', '22.580.000 VNĐ', '1.800.000.000 VNĐ'],
            ['Tháng thứ 60 (Năm thứ 5)', '8.330.000 VNĐ', '11.870.000 VNĐ', '20.200.000 VNĐ', '1.500.000.000 VNĐ'],
            ['Tháng thứ 120 (Năm thứ 10)', '8.330.000 VNĐ', '7.910.000 VNĐ', '16.240.000 VNĐ', '1.000.000.000 VNĐ']
          ]
        }
      },
      {
        id: 'meo-tiet-kiem',
        heading: '4. Mẹo trả nợ trước hạn để tiết kiệm tối đa tiền lãi',
        paragraphs: [
          'Ngân hàng thường thu phí phạt trả nợ trước hạn từ 1% - 2% trong 3 - 5 năm đầu, và miễn phí phạt từ năm thứ 6 trở đi. Hãy tận dụng các khoản thưởng Tết hoặc tiền tích lũy nhàn rỗi để trả bớt nợ gốc.',
          'Chỉ cần bạn trả thêm 50 - 100 triệu tiền gốc mỗi năm, bạn có thể rút ngắn thời hạn vay từ 20 năm xuống còn 10 - 12 năm và tiết kiệm được hơn 400 triệu đồng tiền lãi ngân hàng!'
        ]
      }
    ],
    relatedPropertyId: 'bds-003',
    relatedPropertyNote: 'Khám phá căn hộ 2PN Lumiere Riverside - Phương thức thanh toán linh hoạt hỗ trợ ân hạn nợ gốc'
  },
  {
    id: 'post-tai-chinh-2',
    slug: 'cam-nang-5-buoc-sang-ten-so-hong-va-thue-phi',
    title: 'Thủ Tục Sang Tên Sổ Đỏ, Sổ Hồng Từ A - Z: Quy Trình 5 Bước & Các Loại Thuế Phí 2026',
    excerpt: 'Hướng dẫn chi tiết từng bước công chứng mua bán, nghĩa vụ thuế thu nhập cá nhân 2%, lệ phí trước bạ 0.5% và cách tránh rủi ro pháp lý khi đặt cọc.',
    category: 'tai-chinh',
    categoryName: 'Tài chính & Pháp lý',
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Hồ sơ pháp lý sổ đỏ, sổ hồng và hợp đồng công chứng chuyển nhượng quyền sử dụng đất',
    publishedAt: '18/10/2026',
    readTime: '6 phút đọc',
    views: 7830,
    likes: 320,
    featured: false,
    popular: false,
    author: {
      name: 'Luật sư Phạm Quốc Huy',
      role: 'Đoàn Luật sư TP.HCM - Chuyên gia Pháp lý Bất động sản',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
      bio: 'Hơn 15 năm kinh nghiệm giải quyết tranh chấp đất đai, thẩm định hồ sơ dự án và hỗ trợ công chứng nhà đất.'
    },
    tags: ['Pháp lý nhà đất', 'Sang tên sổ hồng', 'Thuế phí BĐS', 'Công chứng mua bán', 'Luật đất đai'],
    seo: {
      title: 'Quy Trình Sang Tên Sổ Hồng 5 Bước Mới Nhất 2026 | Batdongsan.vn',
      metaDescription: 'Cẩm nang pháp lý chuẩn: 5 bước làm thủ tục sang tên sổ đỏ, hồ sơ cần chuẩn bị, biểu phí thuế TNCN và lệ phí trước bạ mới nhất 2026.',
      keywords: ['thủ tục sang tên sổ hồng', 'thuế chuyển nhượng bđs', 'phí sang tên sổ đỏ', 'công chứng mua bán nhà']
    },
    tableOfContents: [
      { id: 'quy-trinh-5-buoc', title: '1. Quy trình 5 bước chuyển nhượng quyền sở hữu nhà đất', level: 2 },
      { id: 'ho-so-can-chuan-bi', title: '2. Danh mục giấy tờ hai bên cần chuẩn bị', level: 2 },
      { id: 'thue-phi', title: '3. Bảng tra cứu các loại thuế, lệ phí bắt buộc', level: 2 },
      { id: 'luu-y-dat-coc', title: '4. Những lưu ý "sống còn" khi ký hợp đồng đặt cọc', level: 2 }
    ],
    contentSections: [
      {
        id: 'quy-trinh-5-buoc',
        heading: '1. Quy trình 5 bước chuyển nhượng quyền sở hữu nhà đất',
        paragraphs: [
          'Thủ tục chuyển nhượng quyền sử dụng đất và tài sản gắn liền với đất (sang tên sổ đỏ/sổ hồng) là bước pháp lý quan trọng nhất để xác lập quyền sở hữu hợp pháp của bên mua. Theo quy định hiện hành, quy trình chuẩn gồm 5 bước sau:'
        ],
        checklist: [
          'Bước 1: Kiểm tra quy hoạch, ngăn chặn giao dịch và ký hợp đồng đặt cọc có người làm chứng',
          'Bước 2: Lập và ký Hợp đồng chuyển nhượng tại Văn phòng Công chứng có thẩm quyền',
          'Bước 3: Nộp hồ sơ đăng ký biến động tại Văn phòng Đăng ký đất đai (Chi nhánh quận/huyện)',
          'Bước 4: Thực hiện nghĩa vụ tài chính tại Chi cục Thuế theo thông báo nộp thuế',
          'Bước 5: Nhận Giấy chứng nhận quyền sử dụng đất đã được cập nhật biến động sang tên chủ mới'
        ]
      },
      {
        id: 'thue-phi',
        heading: '2. Bảng tra cứu các loại thuế, lệ phí bắt buộc',
        paragraphs: [
          'Khi giao dịch mua bán nhà đất, các bên có trách nhiệm nộp các khoản thuế phí theo quy định của Luật Quản lý Thuế. Thông thường hai bên có thể tự thỏa thuận bên nào chi trả:'
        ],
        table: {
          headers: ['Khoản mục thuế / Phí', 'Mức thu quy định', 'Bên có nghĩa vụ nộp theo luật'],
          rows: [
            ['Thuế Thu nhập Cá nhân (TNCN)', '2% trên giá trị hợp đồng chuyển nhượng', 'Bên chuyển nhượng (Bên Bán)'],
            ['Lệ phí trước bạ', '0.5% trên giá trị nhà đất theo bảng giá đất', 'Bên nhận chuyển nhượng (Bên Mua)'],
            ['Phí công chứng hợp đồng', 'Theo thang giá lũy tiến của Bộ Tư pháp (từ 0.05% - 0.1%)', 'Thỏa thuận giữa 2 bên'],
            ['Phí thẩm định hồ sơ biến động', 'Từ 500.000 - 2.000.000 VNĐ tùy địa phương', 'Bên nhận chuyển nhượng (Bên Mua)'],
            ['Lệ phí cấp đổi/cấp phôi sổ mới', '100.000 - 200.000 VNĐ/lần cấp', 'Bên nhận chuyển nhượng (Bên Mua)']
          ]
        }
      },
      {
        id: 'luu-y-dat-coc',
        heading: '3. Những lưu ý "sống còn" khi ký hợp đồng đặt cọc',
        paragraphs: [
          'Trước khi xuống tiền đặt cọc, người mua tuyệt đối phải đối chiếu bản gốc Giấy chứng nhận với CCCD gắn chip của chủ nhà để tránh trường hợp giả mạo.',
          'Ngoài ra, hãy yêu cầu ghi rõ điều khoản trong hợp đồng cọc: Trong trường hợp bất động sản vướng tranh chấp, kê biên thi hành án hoặc dính quy hoạch giải tỏa không lên được thổ cư thì bên bán phải hoàn trả 100% tiền cọc và bồi thường theo tỷ lệ thỏa thuận.'
        ],
        highlightBox: {
          title: 'Cảnh báo rủi ro vi bằng',
          text: 'Mua bán nhà đất bằng "vi bằng" hoặc "giấy tay" KHÔNG có giá trị thay thế hợp đồng công chứng và KHÔNG được sang tên sổ hồng. Người mua cần hết sức cảnh giác.',
          type: 'warning'
        }
      }
    ],
    relatedPropertyId: 'bds-002',
    relatedPropertyNote: 'Biệt thự Vinhomes Riverside - Sổ đỏ chính chủ, pháp lý chuẩn mực sẵn sàng công chứng'
  },
  {
    id: 'post-phong-thuy-1',
    slug: 'phong-thuy-nha-o-2026-huong-nha-bo-tri-phong-khach',
    title: 'Phong Thủy Nhà Ở 2026: Cách Chọn Hướng Nhà Hợp Tuổi & 7 Điều Tối Kỵ Trong Bố Trí Phòng Khách',
    excerpt: 'Bí quyết cân bằng năng lượng Đông Tứ Trạch và Tây Tứ Trạch, vị trí chiêu tài đắc lộc và cách hóa giải góc chết trong căn hộ hiện đại.',
    category: 'phong-thuy',
    categoryName: 'Phong thủy & Thiết kế',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Không gian phòng khách phong cách Zen tối giản đón ánh sáng tự nhiên và cây xanh phong thủy mang lại vượng khí',
    publishedAt: '15/10/2026',
    readTime: '5 phút đọc',
    views: 10240,
    likes: 512,
    featured: false,
    popular: true,
    author: {
      name: 'Chuyên gia Hoàng Tuấn Kiệt',
      role: 'Chuyên gia Phong thủy Kiến trúc & Môi trường sống',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      bio: 'Tốt nghiệp Đại học Kiến Trúc TP.HCM, chuyên ứng dụng phong thủy khoa học hiện đại vào thiết kế nội thất nhà ở.'
    },
    tags: ['Phong thủy nhà ở', 'Hướng nhà hợp tuổi', 'Thiết kế phòng khách', 'Nội thất', 'Tài lộc'],
    seo: {
      title: 'Phong Thủy Nhà Ở 2026: Hướng Nhà Hợp Tuổi & Bố Trí Phòng Khách | Batdongsan.vn',
      metaDescription: 'Cách chọn hướng nhà hợp tuổi theo Bát Trạch và 7 nguyên tắc bố trí phong thủy phòng khách giúp gia chủ thu hút tài lộc, bình an.',
      keywords: ['phong thủy nhà ở', 'chọn hướng nhà', 'phong thủy phòng khách', 'hóa giải phong thủy']
    },
    tableOfContents: [
      { id: 'cung-menh', title: '1. Xác định cung mệnh: Đông Tứ Trạch & Tây Tứ Trạch', level: 2 },
      { id: 'vi-tri-tai-loc', title: '2. Xác định cung Tài Lộc trong phòng khách', level: 2 },
      { id: '7-dieu-toi-ky', title: '3. 7 điều tối kỵ cần tránh khi kê bàn ghế và gương', level: 2 },
      { id: 'cay-xanh-phong-thuy', title: '4. Gợi ý cây xanh mang lại năng lượng tích cực', level: 2 }
    ],
    contentSections: [
      {
        id: 'cung-menh',
        heading: '1. Xác định cung mệnh: Đông Tứ Trạch & Tây Tứ Trạch',
        paragraphs: [
          'Trong phong thủy Bát Trạch, việc chọn hướng nhà phù hợp với năm sinh của gia chủ là yếu tố cốt lõi giúp đón các luồng khí tốt như Sinh Khí, Diên Niên, Thiên Y, Phục Vị.',
          'Người thuộc Đông Tứ Mệnh (quẻ Khảm, Ly, Chấn, Tốn) hợp với các hướng Đông, Đông Nam, Bắc và Nam. Trong khi người thuộc Tây Tứ Mệnh (quẻ Càn, Khôn, Cấn, Đoài) nên ưu tiên nhà hướng Tây, Tây Bắc, Tây Nam và Đông Bắc.'
        ]
      },
      {
        id: 'vi-tri-tai-loc',
        heading: '2. Xác định cung Tài Lộc trong phòng khách',
        paragraphs: [
          'Cung Tài Lộc thường nằm ở vị trí góc chéo 45 độ đối diện với cửa ra vào chính của căn nhà. Đây là nơi hội tụ sinh khí quan trọng nhất của phòng khách.',
          'Tại vị trí này, gia chủ nên giữ cho không gian luôn sạch sẽ, thoáng đãng, đủ ánh sáng và có thể đặt các vật phẩm phong thủy kích hoạt năng lượng như chậu cây Kim Tiền, hồ cá cảnh phong thủy hoặc quả cầu thạch anh vàng.'
        ],
        quote: {
          text: 'Phong thủy khoa học bản chất là nghệ thuật sắp đặt không gian sống sao cho đón được gió lành, ánh sáng chan hòa và tạo cảm giác thư thái cho con người sau ngày dài làm việc.',
          author: 'KTS. Hoàng Tuấn Kiệt'
        }
      },
      {
        id: '7-dieu-toi-ky',
        heading: '3. 7 điều tối kỵ cần tránh khi kê bàn ghế và gương',
        paragraphs: [
          'Bố trí nội thất phòng khách tưởng chừng đơn giản nhưng rất nhiều gia đình vô tình phạm phải những sai lầm phong thủy sau:'
        ],
        checklist: [
          'Không đặt sofa đối diện trực xung với cửa chính (hiện tượng lộ xung gây bất an)',
          'Lưng ghế sofa phải tựa vào bức tường vững chắc, tránh kê chơ vơ giữa phòng hoặc tựa vào cửa sổ',
          'Không để xà ngang (dầm bê tông) đè lên đỉnh đầu vị trí ngồi của sofa',
          'Tránh treo gương đối diện cửa ra vào làm phản xạ năng lượng tốt ra khỏi nhà',
          'Không để cửa chính nhìn thông một đường thẳng ra cửa ban công sau (hiện tượng thoái tài)',
          'Tránh dùng tranh treo tường mang màu sắc u ám hoặc hình ảnh thú dữ hung bạo',
          'Không để các góc nhọn của tủ hoặc kệ chỉ thẳng vào khu vực tiếp khách chính'
        ]
      }
    ],
    relatedPropertyId: 'bds-001',
    relatedPropertyNote: 'Căn hộ Masteri Thảo Điền - Thiết kế ban công Đông Nam đón gió lành vượng khí'
  },
  {
    id: 'post-phong-thuy-2',
    slug: 'meo-cai-tao-can-ho-70m2-nhu-khach-san-150-trieu',
    title: 'Kinh Nghiệm Cải Tạo Căn Hộ 70m² Đẹp Như Khách Sạn 5 Sao Với Ngân Sách 150 Triệu',
    excerpt: 'Bí quyết lựa chọn vật liệu thông minh, giải pháp ánh sáng tầng layer và cách tối ưu hóa không gian lưu trữ cho căn hộ chung cư 2 phòng ngủ.',
    category: 'phong-thuy',
    categoryName: 'Phong thủy & Thiết kế',
    coverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Nội thất phòng khách và bếp căn hộ hiện đại thiết kế tinh tế với gam màu be ấm và gỗ sồi',
    publishedAt: '12/10/2026',
    readTime: '6 phút đọc',
    views: 5410,
    likes: 240,
    featured: false,
    popular: false,
    author: {
      name: 'KTS. Đặng Thanh Trúc',
      role: 'Nhà sáng lập Studio Nội Thất Minimalist Living',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
      bio: 'Chuyên gia cải tạo không gian sống nhỏ gọn, thông minh và phong cách Bắc Âu (Scandinavian) tại Hà Nội & TP.HCM.'
    },
    tags: ['Cải tạo nhà', 'Thiết kế nội thất', 'Căn hộ 70m2', 'Tiết kiệm chi phí', 'Bảo trì nhà cửa'],
    seo: {
      title: 'Mẹo Cải Tạo Căn Hộ 70m² Đẹp Sang Trọng Với 150 Triệu | Batdongsan.vn',
      metaDescription: 'Chia sẻ kinh nghiệm thực chiến cải tạo căn hộ 2 phòng ngủ: Lựa chọn vật liệu MDF chống ẩm An Cường, hệ đèn ray nam châm và nội thất thông minh.',
      keywords: ['cải tạo căn hộ chung cư', 'thiết kế nội thất 70m2', 'chi phí cải tạo nhà 150 triệu']
    },
    tableOfContents: [
      { id: 'lap-ngan-sach', title: '1. Phân bổ ngân sách 150 triệu đồng hợp lý', level: 2 },
      { id: 'vat-lieu-thong-minh', title: '2. Lựa chọn vật liệu bền bỉ và kinh tế', level: 2 },
      { id: 'nghe-thuat-anh-sang', title: '3. Nâng tầm không gian bằng ánh sáng Layer', level: 2 },
      { id: 'kinh-nghiem-nghiem-thu', title: '4. 5 kinh nghiệm khi giám sát và nghiệm thu thợ', level: 2 }
    ],
    contentSections: [
      {
        id: 'lap-ngan-sach',
        heading: '1. Phân bổ ngân sách 150 triệu đồng hợp lý',
        paragraphs: [
          'Với ngân sách 150 triệu đồng cho căn hộ 70m² đã bàn giao thô cơ bản, bạn hoàn toàn có thể sở hữu không gian sống tinh tế nếu biết chia tỷ lệ ngân sách chính xác:',
          'Thay vì đầu tư dàn trải cho tất cả các phòng, hãy tập trung 60% kinh phí cho không gian sinh hoạt chung (phòng khách + bếp liên thông), vì đây là nơi gia đình dành tới 80% thời gian khi ở nhà.'
        ],
        table: {
          headers: ['Hạng mục thi công', 'Mức đầu tư dự toán', 'Tỷ lệ % ngân sách'],
          rows: [
            ['Hệ tủ bếp kịch trần & Phụ kiện nâng hạ', '42.000.000 VNĐ', '28%'],
            ['Sofa góc, bàn trà & Kệ tivi treo tường', '25.000.000 VNĐ', '16.7%'],
            ['Nội thất phòng ngủ master (Giường bọc nỉ, tủ áo)', '35.000.000 VNĐ', '23.3%'],
            ['Hệ thống chiếu sáng LED thanh nhôm & Đèn ray', '18.000.000 VNĐ', '12%'],
            ['Sơn hiệu ứng tường bê tông / be ấm', '12.000.000 VNĐ', '8%'],
            ['Chi phí dự phòng phát sinh & Decor rèm cửa', '18.000.000 VNĐ', '12%']
          ]
        }
      },
      {
        id: 'vat-lieu-thong-minh',
        heading: '2. Lựa chọn vật liệu bền bỉ và kinh tế',
        paragraphs: [
          'Đối với phần gỗ công nghiệp, hãy lựa chọn cốt gỗ MDF lõi xanh chống ẩm phủ Melamine từ các nhà sản xuất uy tín như An Cường hoặc Ba Vàng. Melamine hiện nay có các vân gỗ sồi tự nhiên và vân đá xi măng vô cùng chân thực, độ bền trên 10 năm mà giá thành chỉ bằng 1/3 so với gỗ tự nhiên.',
          'Mặt bếp nên ưu tiên đá thạch anh nhân tạo gốc thạch anh chống ố vàng và chịu lực tốt, thay vì đá marble xốp dễ ngấm nước trà hay cà phê.'
        ]
      },
      {
        id: 'nghe-thuat-anh-sang',
        heading: '3. Nâng tầm không gian bằng ánh sáng Layer',
        paragraphs: [
          'Bí quyết tạo cảm giác sang trọng như khách sạn không nằm ở những món đồ đắt đỏ mà nằm ở kịch bản ánh sáng. Hãy bỏ ngay bóng đèn tuýp trắng chói chang đơn điệu giữa trần!',
          'Hãy phối hợp 3 tầng ánh sáng: Ánh sáng tổng thể (đèn âm trần góc chiếu 38 độ ấm 3000K-3500K), ánh sáng tác vụ (đèn hắt dưới đáy tủ bếp, đèn đọc sách đầu giường) và ánh sáng điểm nhấn (dải LED hắt khe rèm hoặc tranh trang trí).'
        ]
      }
    ],
    relatedPropertyId: 'bds-003',
    relatedPropertyNote: 'Tham khảo mẫu căn hộ bàn giao cao cấp Lumiere Riverside An Phú'
  },
  {
    id: 'post-cau-chuyen-1',
    slug: 'hanh-trinh-8-thang-tim-mua-biet-thu-vinhomes-riverside',
    title: 'Câu Chuyện Khách Hàng: Hành Trình 8 Tháng Tìm Kiếm Tổ Ấm Cho 3 Thế Hệ Tại Vinhomes Riverside',
    excerpt: 'Chia sẻ chân thực từ anh Hoàng Minh (42 tuổi) về nỗi băn khoăn giữa nhà phố trung tâm Hoàn Kiếm và biệt thự sinh thái Long Biên, cùng cảm xúc ngày nhận chìa khóa.',
    category: 'cau-chuyen',
    categoryName: 'Câu chuyện khách hàng',
    coverImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Gia đình hạnh phúc trước căn biệt thự ven hồ sinh thái trong ánh nắng chiều yên bình',
    publishedAt: '08/10/2026',
    readTime: '7 phút đọc',
    views: 6780,
    likes: 389,
    featured: false,
    popular: true,
    author: {
      name: 'Ban Biên Tập Batdongsan.vn',
      role: 'Chuyên mục Khách Hàng & Trải Nghiệm Thực Tế',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
      bio: 'Lắng nghe và truyền tải những câu chuyện an cư đầy cảm xúc từ cộng đồng cư dân trên khắp cả nước.'
    },
    tags: ['Câu chuyện khách hàng', 'Vinhomes Riverside', 'Kinh nghiệm mua nhà', 'Biệt thự sinh thái', 'Gia đình 3 thế hệ'],
    seo: {
      title: 'Hành Trình Mua Biệt Thự Vinhomes Riverside | Câu Chuyện Khách Hàng | Batdongsan.vn',
      metaDescription: 'Nhật ký 8 tháng tìm mua nhà của gia đình 3 thế hệ: Bài toán cân não giữa phố cổ chật chội và không gian sống sinh thái ven sông.',
      keywords: ['kinh nghiệm mua vinhomes riverside', 'câu chuyện mua nhà', 'mua biệt thự hà nội']
    },
    tableOfContents: [
      { id: 'bai-toan-gia-dinh', title: '1. Nỗi trăn trở của gia đình "tam đại đồng đường"', level: 2 },
      { id: 'cuoc-cung-so-sanh', title: '2. Nhà phố trung tâm hay Đô thị sinh thái ven sông?', level: 2 },
      { id: 'ngay-nhan-nha', title: '3. Giây phút nhìn thấy nụ cười của cha mẹ và các con', level: 2 },
      { id: 'loi-nhan-nhu', title: '4. Lời nhắn gửi dành cho những ai đang tìm kiếm tổ ấm', level: 2 }
    ],
    contentSections: [
      {
        id: 'bai-toan-gia-dinh',
        heading: '1. Nỗi trăn trở của gia đình "tam đại đồng đường"',
        paragraphs: [
          '"Gia đình tôi có bố mẹ già ngoài 70 tuổi, hai vợ chồng và hai bé đang tuổi đi học. Trước đây, cả nhà sống trong căn nhà 4 tầng diện tích sàn 55m² sâu trong ngõ nhỏ phố Hàng Bông (Hoàn Kiếm). Tiện thì tiện thật, bước chân ra ngõ là phố xá náo nhiệt, nhưng mỗi ngày nhìn bố mẹ phải leo cầu thang dốc đứng, các con không có sân chơi phải dán mắt vào iPad, tôi đau đáu một giấc mơ đổi nhà."',
          'Sau hơn 15 năm kinh doanh trong ngành xuất nhập khẩu, vợ chồng anh Minh quyết định dành trọn số tiền tích lũy 40 tỷ đồng để tìm kiếm một không gian sống xứng đáng cho cả gia đình.'
        ]
      },
      {
        id: 'cuoc-cung-so-sanh',
        heading: '2. Nhà phố trung tâm hay Đô thị sinh thái ven sông?',
        paragraphs: [
          'Trong suốt 6 tháng đầu, anh Minh đi xem gần 20 căn nhà mặt phố từ Đống Đa, Ba Đình đến Cầu Giấy. Tuy nhiên, căn vừa tài chính thì không có chỗ đỗ ô tô, căn có sân vườn thì giá vượt quá 70 tỷ. Nỗi lo về khói bụi ô nhiễm và tiếng ồn còi xe xe cộ khiến bố mẹ anh ngần ngại.',
          'Đến tháng thứ 7, thông qua sự tư vấn của chuyên viên batdongsan.vn, anh lần đầu tiên đưa bố mẹ sang tham quan tiểu khu Hoa Sữa tại Vinhomes Riverside Long Biên. Khoảnh khắc bố anh đứng bên hồ sinh thái 12.4ha hít thở làn gió trong lành thoảng hương hoa cỏ, ông đã mỉm cười gật đầu: "Sống ở đây thì tuổi già mới an yên con ạ."'
        ],
        quote: {
          text: 'Ngôi nhà không chỉ là tài sản giá trị hàng chục tỷ, mà là nơi nuôi dưỡng ký ức tuổi thơ của con trẻ và là chốn dưỡng già bình yên nhất của đấng sinh thành.',
          author: 'Anh Hoàng Minh - Cư dân Vinhomes Riverside'
        }
      },
      {
        id: 'ngay-nhan-nha',
        heading: '3. Giây phút nhìn thấy nụ cười của cha mẹ và các con',
        paragraphs: [
          'Căn biệt thự đơn lập 420m² sở hữu bến cano riêng và sân vườn rộng mở hướng ra hồ. Giờ đây, mỗi buổi sớm mai, bố mẹ anh có thể tản bộ trong khuôn viên an ninh khép kín, hai đứa trẻ thỏa sức đạp xe và bơi lội, còn vợ chồng anh có thể câu cá thư giãn mỗi dịp cuối tuần.',
          'Quãng đường đi làm vào trung tâm qua cầu Vĩnh Tuy 2 chỉ mất đúng 18 phút, hoàn toàn phá vỡ định kiến "ở Long Biên xa xôi" trước đây.'
        ]
      }
    ],
    relatedPropertyId: 'bds-002',
    relatedPropertyNote: 'Khám phá biệt thự đơn lập ven hồ tương tự tại phân khu Vinhomes Riverside Hoa Sữa'
  }
];

export const BLOG_CATEGORIES: { id: BlogPost['category'] | 'all'; label: string; count: number }[] = [
  { id: 'all', label: 'Tất cả bài viết', count: BLOG_POSTS.length },
  { id: 'thi-truong', label: 'Tin thị trường', count: BLOG_POSTS.filter(p => p.category === 'thi-truong').length },
  { id: 'du-an', label: 'Review dự án', count: BLOG_POSTS.filter(p => p.category === 'du-an').length },
  { id: 'tai-chinh', label: 'Tài chính & Pháp lý', count: BLOG_POSTS.filter(p => p.category === 'tai-chinh').length },
  { id: 'phong-thuy', label: 'Phong thủy & Thiết kế', count: BLOG_POSTS.filter(p => p.category === 'phong-thuy').length },
  { id: 'cau-chuyen', label: 'Câu chuyện khách hàng', count: BLOG_POSTS.filter(p => p.category === 'cau-chuyen').length }
];
