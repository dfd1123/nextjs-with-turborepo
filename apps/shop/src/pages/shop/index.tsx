import React from "react";

const ShopPage = ({ data }: { data: string }) => {
    return (
    <>
        <h1>SHOP 페이지</h1>
        <p>{data}</p>
    </>
    );
}

export async function getServerSideProps() {
    return {
        props: {
            data: 'shop에 온걸 환영해!'
        }
    }
}

export default ShopPage;