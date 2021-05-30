import React, { Component } from 'react';

import Footer from '../Home/home-footer';
import ImageReg from "../../Images/background-second.jpg"

class RegulationsContent extends Component {
    
    render() {

        return (
            <div className="home-container">
                <div className="photo-section photo-section-second" style={{backgroundImage: "url("+{ImageReg}+")"}}>
                    <div className="opacity-background">
                    </div>
                </div>
                <div className="home-content">
                    <div id="about-header" className="content-header">
                        <div className="width-divider">
                            <h1 id="czym-jest">Regulamin</h1>
                        </div>
                    </div>
                    <div id="about-content">
                        <div className="width-divider" style={{padding: "80px 0px", textAlign: "justify"}}>
                            <h3>Postanowienia ogólne</h3><br/>
                            <p>Niniejsza strona internetowa (z wyłączeniem stron, do których prowadzą linki z niniejszej
                            strony) jest prowadzona przez ePortfolio Sp. z o. o. z siedzibą w Poznaniu (zwaną
                            dalej "spółką ePortfolio").
                            <br/>Niniejsza strona przeznaczona jest wyłącznie do użytku osób znajdujących się w Polsce, a
                            wszelkie informacje dotyczące produktów, usług i promocji dotyczą wyłącznie Polski i
                            obowiązują wyłącznie w Polsce.
                            <br/>Wejście na tę stronę internetową jest równoznaczne z zaakceptowaniem wiążącego
                            charakteru niniejszej informacji prawnej. Użytkownik nie wyrażający zgody na
                            przestrzeganie postanowień niniejszej informacji jest proszony o niekorzystanie z niniejszej
                            strony internetowej. Inne strony internetowe spółek grupy ePortfolio mogą podlegać
                            odmiennym warunkom, z którymi należy zapoznać się odrębnie.</p>
                            <hr/><br/>
                            <h3>Prawa własności intelektualnej</h3><br/>
                            <p>Wszelkie prawa własności intelektualnej, w tym w szczególności prawa autorskie oraz prawa
                            do znaków towarowych przysługujące w odniesieniu do wszelkich tekstów, ilustracji,
                            dźwięków, oprogramowania i innych materiałów zawartych na niniejszej stronie internetowej
                            stanowią własność spółki ePortfolio lub jej spółek stowarzyszonych, lub objęte są
                            zezwoleniem na ich wykorzystanie udzielonym przez odpowiedniego właściciela.
                            Użytkownik strony może drukować części strony lub pobierać je na twardy dysk komputera i
                            przekazywać innym osobom, pod warunkiem, że czyni to wyłącznie w celach
                            informacyjnych lub innych celach dopuszczalnych w ramach obowiązujących przepisów
                            prawa.
                            <br/>Bez uprzedniej pisemnej zgody spółki ePortfolio użytkownik strony nie może:
                            <br/>1. wykorzystywać (kopii/ części) niniejszej strony internetowej lub oznaczeń zawartych
                            w jej treści w celach komercyjnych;
                            <br/>2. modyfikować (części) niniejszej strony internetowej ani włączać jej do treści innych
                            opracowań (takich jak np. dokumenty papierowe, blogi lub strony internetowe osób
                            trzecich).</p>
                            <hr/><br/>
                            <h3>Treść strony</h3><br/>
                            <p>Niniejsza strona oraz zamieszczone na niej treści mają wyłącznie charakter ogólnej
                            informacji o Spółce i jej produktach i, o ile nic innego nie wynika z zapisów podanych na
                            stronie, nie zmierzają do zawarcia, zmiany lub rozwiązania jakichkolwiek stosunków
                            prawnych. Treści zawarte na niniejszej stronie zgromadziliśmy z najwyższą możliwą
                            starannością. Ze względu na informacyjny charakter strony, osoby pragnące korzystać ze
                            strony w innych celach niż dla celów uzyskania ogólnych informacji o Spółce i jej
                            produktach, proszone są o bezpośredni kontakt i potwierdzenie informacji z
                            przedstawicielami Spółki. Informacje zawarte na niniejszej stronie nie stanowią zachęty do 
                            inwestowania w spółki będące członkami grupy ePortfolio, nie powinny także stanowić
                            podstawy decyzji inwestycyjnych.</p>
                            <hr/><br/>
                            <h3>Odpowiedzialność</h3><br/>
                            <p>Spółka ePortfolio ponosi odpowiedzialność za ewentualne szkody powstałe w wyniku
                            używania niniejszej strony internetowej na zasadach określonych w powszechnie
                            obowiązujących przepisach prawa.</p>
                            <hr/><br/>
                            <h3>Strony, do których linki znajdują się na niniejszej stronie</h3><br/>
                            <p>Niniejsza strona może zawierać odesłania (np. w formie hyperlinków, bannerów lub
                            przycisków) do innych stron internetowych, które dotyczą poszczególnych aspektów
                            niniejszej strony. Nie oznacza to jednak automatycznie, że spółka ePortfolio ma jakiekolwiek
                            powiązania z takimi stronami lub ich właścicielami.</p>
                            <hr/><br/>
                            <h3>Udostępnione informacje</h3><br/>
                            <p>Udostępnienie informacji lub materiałów spółce ePortfolio jest jednoznaczne z wyrażeniem
                            zgody na nieodpłatne wykorzystywanie przez naszą firmę tych informacji lub materiałów
                            wedle naszego uznania, oraz jest potwierdzeniem, że wykorzystywanie tych treści nie
                            stanowi naruszenia praw innych osób.
                            <br/>Spółka ePortfolio nie prowadzi stałej kontroli niniejszej witryny, w tym jej części, które
                            zawierają treści zamieszczane przez innych użytkowników. Osoby, które zauważą treści
                            innych użytkowników, które mogą naruszać obowiązujące przepisy lub uprawnienia innych
                            użytkowników, proszone są o zgłoszenie takiego faktu spółce ePortfolio. W uzasadnionych
                            przypadkach, Spółka ePortfolio zastrzega sobie prawo usuwania z niniejszej witryny całości
                            lub części treści pochodzących od osób trzecich bez odrębnego zawiadomienia.</p>
                            <hr/><br/>
                            <h3>Ochrona danych</h3><br/>
                            <p>Dane osobowe (takie jak imię, nazwisko i adres e-mail) udostępniane spółce ePortfolio za
                            pośrednictwem niniejszej strony internetowej będą wykorzystywane wyłącznie w sposób
                            zgodny z postanowieniami informacji o ochronie danych osobowych. Prosimy o zapoznanie
                            się z Polityką prywatności przed przekazaniem spółce ePortfolio jakichkolwiek danych.</p>
                            <hr/><br/>
                            <h3>Kontakt</h3><br/>
                            <p>W przypadku pytań lub skarg dotyczących niniejszej strony internetowej, prosimy o
                            korzystanie z następujących danych kontaktowych:
                            <br/>ePortfolio Polska Sp. z o.o.
                            <br/>Poznań
                            <br/>e-mail: eportfolio.team.contact@gmail.com</p>
                            <hr/><br/>
                            <h3>Pozostałe postanowienia</h3><br/>
                            <p>Spółka ePortfolio zastrzega sobie prawo wprowadzania w przyszłości zmian i modyfikacji
                            niniejszej informacji prawnej. O zamiarze wprowadzenia zmian Spółka ePortfolio poinformuje
                            na swojej stronie internetowej z 7 dniowym wyprzedzeniem.
                            <br/>Niniejsza informacja prawna oraz korzystanie z niniejszej strony internetowej przez osoby ją
                            odwiedzające podlegają przepisom prawa polskiego.</p>
                            <hr/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default RegulationsContent;