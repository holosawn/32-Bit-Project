import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng:"Tur",
        resources:{
            en:{
                translation: {
                    keyboardLayout:"en",

                    Cvq:"Complete Vehicle Quality",
                    help:"Help",
                    mainPage:"MainPage",
                    assist:"Assistance",
                    allTerminals:"All Terminals",
                    deptBasis:"On Department Basis",
                    filterBasis:"On Filter Basis",


                    error:"Error",
                    userNotFound:"User Not Found",
                    terminalList:"Terminal List",
                    sicil:"ID",
                    password:"Password",
                    assy:"Assy No",
                    date:"Date",
                    shift:"Shift",
                    login:"Login",
                    cancel:"Cancel",


                    bodyNo:"Body No", 
                    defectlogscreen:"Defect Login Screen",
                    color:"Color",
                            
                    
                    exit:"Exit",
                    mdlFirstPic:"Model First Image",
                    back:"Back",
                    defectList:"Defect List",
                    clear:"Clear",
                    bigFont:"Big Font",

                    fastSave:"Fast Save",
                    savePass:"Save and Pass",
                    defectSave:"Save Defect",
                    search:"Search",
                    terminalFirstPic:"Terminal First Pic",
                    frequentDefect:"Frequent Defect",
                    techSupport:"Technical Support",


                    defResp:"Defect Manager",
                    defType:"Defect Type",
                    exitDept:"Exit Department",
                    save:"Save",
                    exp:"explanation",
                    actTaken:"Action Taken",
                    minorResp:"Minor Manager",


                    BODYNO:"BODY NO",
                    SEARCH:"SEARCH",
                    CARLİST:"CAR LİST",
                    MANUALDEF:"MANUAL DEFECT",
                    MULTİPLEDEF:"MULTİPLE DEFECTS",
                    DEFLİST:"DEFECT LİST",
                    DEFCOPY:"DEFECT COPY",
                    EXİT:"EXİT",

                    SUCCESS:"SUCCESS",
                    CHANGESAVED:"CHANGES HAS SAVED",
                    totalRows:"Total Rows",
                    remove:"Remove",
                    confirm:"Confirm Removal",
                    question:"Are you sure you want to remove this item?",
                    reporter:"Reporter",
                    body:"Body",
                    assy:"Assy",
                    sicil:"ID",
                    part:"Part",
                    defect:"Defect",
                    hour:"Hour",
                    defManager:"Defect Mng.",
                    minorRes:"Minor Manager",
                    process:"Process"

                }
            },
            Tur:{
                translation: {
                    keyboardLayout:"Tur",

                    Cvq:"Tüm Araç Özellikleri",
                    help:"Yardım",
                    mainPage:"Anasayfa",
                    assist:"Destek",
                    allTerminals:"Tüm Terminaller",
                    deptBasis:"Bölüm Bazında",
                    filterBasis:"Filtre Bazında",


                    error:"Hata",
                    userNotFound:"Kullanıcı Bulunamadı",
                    terminalList:"Terminal Listesi",
                    sicil:"Sicil",
                    password:"Şifre",
                    assy:"Montaj No",
                    date:"Tarih",
                    shift:"Vardiya",
                    login:"Giriş Yap",
                    cancel:"İptal",


                    bodyNo:"Body No", 
                    defectlogscreen:"Hata Giriş Sayfası",
                    color:"Renk",
                            
                    
                    exit:"Çıkış",
                    mdlFirstPic:"Model İlk Resmi",
                    back:"Geri",
                    defectList:"Hata Listesi",
                    clear:"Temizle",
                    bigFont:"Büyük Font",

                    fastSave:"Hızlı Kaydet",
                    savePass:"Kaydet ve geç",
                    defectSave:"Hata Kayıt",
                    search:"Ara",
                    terminalFirstPic:"Terminal ilk Resmi",
                    frequentDefect:"Sık Karşılaşılan Hata",
                    techSupport:"Teknik Destek",


                    defResp:"Hata Sorumlusu",
                    defType:"Hata Türü",
                    exitDept:"Çıkış Departmanı",
                    save:"Kaydet",
                    exp:"Açıklama",
                    actTaken:"Yapılan İşlem",
                    minorResp:"Alt Sorumlu",


                    BODYNO:"BODY NO",
                    SEARCH:"ARA",
                    CARLİST:"ARAÇ LİSTESİ",
                    MANUALDEF:"MANUEL HATA",
                    MULTİPLEDEF:"ÇOKLU HATA",
                    DEFLİST:"HATA LİSTESİ",
                    DEFCOPY:"HATA KOPYA",
                    EXİT:"ÇIKIŞ",

                    SUCCESS:"BAŞARILI",
                    CHANGESAVED:"DEĞİŞİKLİKLER KAYDEDİLDİ",
                    totalRows:"Toplam Satır",
                    remove:"Sil",
                    confirm:"Silmeyi Onayla",
                    question:"Bu veriyi silmek istediğine emin misin ?",
                    reporter:"Bildiren",
                    body:"Body",
                    assy:"Montaj",
                    sicil:"Sicil",
                    part:"Parça",
                    defect:"hata",
                    hour:"Saat",
                    defManager:"Hata Mng.",
                    minorRes:"Alt Sorumlu",
                    process:"İşlem"

                }
            }
        }
    })