import React from 'react';
import { useTranslation } from 'react-i18next';

const NoPage = () => {
    const { t } = useTranslation()
  return (
    <div>
      <h1>{t("noPage")}</h1>
      <p>{t("noPagep")}</p>
    </div>
  );
};

export default NoPage;
